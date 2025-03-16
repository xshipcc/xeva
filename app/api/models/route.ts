import { NextResponse, type NextRequest } from 'next/server'
import { handleError } from '../utils'
import { ErrorType } from '@/constant/errors'

const geminiApiKey = process.env.GEMINI_API_KEY as string
const geminiApiBaseUrl = process.env.GEMINI_API_BASE_URL as string
const deepseekApiKey = process.env.DEEPSEEK_API_KEY as string
const deepseekApiBaseUrl = process.env.DEEPSEEK_API_BASE_URL || 'https://api.deepseek.com'
const siliconflowApiKey = process.env.SILICONFLOW_API_KEY as string
const siliconflowApiBaseUrl = process.env.SILICONFLOW_API_BASE_URL || 'https://api.siliconflow.cn'
const o3ApiKey = process.env.O3_API_KEY as string
const o3ApiBaseUrl = process.env.O3_API_BASE_URL || 'https://api.o3.fan'
const baiduApiKey = process.env.BAIDU_API_KEY as string
const baiduSecretKey = process.env.BAIDU_SECRET_KEY as string
const baiduApiBaseUrl = process.env.BAIDU_API_BASE_URL || 'https://aip.baidubce.com'
const mode = process.env.NEXT_PUBLIC_BUILD_MODE

export const runtime = 'edge'
export const preferredRegion = ['cle1', 'iad1', 'pdx1', 'sfo1', 'sin1', 'syd1', 'hnd1', 'kix1']

export async function GET(req: NextRequest) {
  if (mode === 'export') return new NextResponse('Not available under static deployment')

  const provider = req.nextUrl.searchParams.get('provider') || 'gemini'
  
  try {
    switch (provider) {
      case 'gemini':
        if (!geminiApiKey) {
          return NextResponse.json({ code: 50001, message: ErrorType.NoGeminiKey }, { status: 500 })
        }
        const apiBaseUrl = geminiApiBaseUrl || 'https://generativelanguage.googleapis.com'
        const response = await fetch(`${apiBaseUrl}/v1beta/models?key=${geminiApiKey}`)
        const result = await response.json()
        return NextResponse.json(result)
        
      case 'deepseek':
        if (!deepseekApiKey) {
          return NextResponse.json({ code: 50002, message: 'DeepSeek API key is not provided' }, { status: 500 })
        }
        return await getDeepseekModels()
        
      case 'siliconflow':
        if (!siliconflowApiKey) {
          return NextResponse.json({ code: 50003, message: 'SiliconFlow API key is not provided' }, { status: 500 })
        }
        return await getSiliconflowModels()
        
      case 'o3':
        if (!o3ApiKey) {
          return NextResponse.json({ code: 50004, message: 'O3 API key is not provided' }, { status: 500 })
        }
        return await getO3Models()
        
      case 'baidu':
        if (!baiduApiKey || !baiduSecretKey) {
          return NextResponse.json({ code: 50005, message: 'Baidu API key or secret key is not provided' }, { status: 500 })
        }
        return await getBaiduModels()
        
      default:
        return NextResponse.json({ code: 40001, message: `Unsupported provider: ${provider}` }, { status: 400 })
    }
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message)
    }
  }
}

// 获取 DeepSeek 模型列表
async function getDeepseekModels() {
  try {
    const response = await fetch(`${deepseekApiBaseUrl}/v1/models`, {
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`
      }
    })
    const data = await response.json()
    
    // 转换为与 Gemini API 相似的格式
    const result = {
      models: data.data.map((model: any) => ({
        name: model.id,
        displayName: model.id,
        description: model.description || '',
        supportedGenerationMethods: ['generateContent'],
        inputTokenLimit: model.context_length || 4096,
        outputTokenLimit: model.context_length || 4096,
        provider: 'deepseek'
      }))
    }
    
    return NextResponse.json(result)
  } catch (error) {
    return handleError(`Failed to fetch DeepSeek models: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// 获取 SiliconFlow 模型列表
async function getSiliconflowModels() {
  try {
    const response = await fetch(`${siliconflowApiBaseUrl}/v1/models`, {
      headers: {
        'Authorization': `Bearer ${siliconflowApiKey}`
      }
    })
    const data = await response.json()
    
    // 转换为与 Gemini API 相似的格式
    const result = {
      models: data.data.map((model: any) => ({
        name: model.id,
        displayName: model.id,
        description: model.description || '',
        supportedGenerationMethods: ['generateContent'],
        inputTokenLimit: model.context_length || 4096,
        outputTokenLimit: model.context_length || 4096,
        provider: 'siliconflow'
      }))
    }
    
    return NextResponse.json(result)
  } catch (error) {
    return handleError(`Failed to fetch SiliconFlow models: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// 获取 O3 模型列表
async function getO3Models() {
  try {
    const response = await fetch(`${o3ApiBaseUrl}/v1/models`, {
      headers: {
        'Authorization': `Bearer ${o3ApiKey}`
      }
    })
    const data = await response.json()
    
    // 转换为与 Gemini API 相似的格式
    const result = {
      models: data.data.map((model: any) => ({
        name: model.id,
        displayName: model.id,
        description: model.description || '',
        supportedGenerationMethods: ['generateContent'],
        inputTokenLimit: model.context_length || 4096,
        outputTokenLimit: model.context_length || 4096,
        provider: 'o3'
      }))
    }
    
    return NextResponse.json(result)
  } catch (error) {
    return handleError(`Failed to fetch O3 models: ${error instanceof Error ? error.message : String(error)}`)
  }
}

// 获取百度文心一言模型列表
async function getBaiduModels() {
  try {
    // 获取 access token
    const tokenUrl = `${baiduApiBaseUrl}/oauth/2.0/token?grant_type=client_credentials&client_id=${baiduApiKey}&client_secret=${baiduSecretKey}`
    const tokenResponse = await fetch(tokenUrl, { method: 'POST' })
    const tokenData = await tokenResponse.json()
    
    if (!tokenData.access_token) {
      return handleError('Failed to get Baidu access token')
    }
    
    // 百度没有提供获取模型列表的 API，这里返回预定义的模型列表
    const baiduModels = [
      {
        name: 'ernie-bot-4',
        displayName: 'ERNIE-Bot 4.0',
        description: '百度文心大模型 4.0，支持多模态输入，推理能力强',
        supportedGenerationMethods: ['generateContent'],
        inputTokenLimit: 6000,
        outputTokenLimit: 6000,
        provider: 'baidu'
      },
      {
        name: 'ernie-bot-8k',
        displayName: 'ERNIE-Bot 8K',
        description: '百度文心大模型，支持8K上下文',
        supportedGenerationMethods: ['generateContent'],
        inputTokenLimit: 8000,
        outputTokenLimit: 8000,
        provider: 'baidu'
      },
      {
        name: 'ernie-bot-turbo',
        displayName: 'ERNIE-Bot Turbo',
        description: '百度文心大模型，快速版本',
        supportedGenerationMethods: ['generateContent'],
        inputTokenLimit: 4000,
        outputTokenLimit: 4000,
        provider: 'baidu'
      },
      {
        name: 'ernie-bot',
        displayName: 'ERNIE-Bot',
        description: '百度文心大模型标准版',
        supportedGenerationMethods: ['generateContent'],
        inputTokenLimit: 3000,
        outputTokenLimit: 3000,
        provider: 'baidu'
      }
    ]
    
    return NextResponse.json({ models: baiduModels })
  } catch (error) {
    return handleError(`Failed to fetch Baidu models: ${error instanceof Error ? error.message : String(error)}`)
  }
}
