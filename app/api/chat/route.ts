import { NextResponse, type NextRequest } from 'next/server'
import { GEMINI_API_BASE_URL } from '@/constant/urls'
import { handleError } from '../utils'
import { hasUploadFiles, getRandomKey } from '@/utils/common'

export const runtime = 'edge'
export const preferredRegion = ['cle1', 'iad1', 'pdx1', 'sfo1', 'sin1', 'syd1', 'hnd1', 'kix1']

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

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const body = await req.json()
  const model = searchParams.get('model')!
  const provider = searchParams.get('provider') || 'gemini'
  const version = 'v1beta'

  try {
    let url = ''
    let headers: Record<string, string> = {
      'Content-Type': req.headers.get('Content-Type') || 'application/json',
    }
    let requestBody = body

    // 根据不同的提供商设置不同的请求参数
    if (provider === 'gemini') {
      const apiKey = getRandomKey(geminiApiKey, hasUploadFiles(body.contents))
      url = `${geminiApiBaseUrl || GEMINI_API_BASE_URL}/${version}/models/${model}`
      if (!model.startsWith('imagen')) url += '?alt=sse'
      headers['x-goog-api-client'] = req.headers.get('x-goog-api-client') || 'genai-js/0.21.0'
      headers['x-goog-api-key'] = apiKey
    } else if (provider === 'deepseek') {
      url = `${deepseekApiBaseUrl}/v1/chat/completions`
      headers['Authorization'] = `Bearer ${deepseekApiKey}`
      requestBody = transformToOpenAIFormat(body, model)
    } else if (provider === 'siliconflow') {
      url = `${siliconflowApiBaseUrl}/v1/chat/completions`
      headers['Authorization'] = `Bearer ${siliconflowApiKey}`
      requestBody = transformToOpenAIFormat(body, model)
    } else if (provider === 'o3') {
      url = `${o3ApiBaseUrl}/v1/chat/completions`
      headers['Authorization'] = `Bearer ${o3ApiKey}`
      requestBody = transformToOpenAIFormat(body, model)
    } else if (provider === 'baidu') {
      const accessToken = await getBaiduAccessToken()
      url = `${baiduApiBaseUrl}/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/${model}?access_token=${accessToken}`
      requestBody = transformToBaiduFormat(body)
    } else {
      return handleError(`不支持的提供商: ${provider}`)
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    })
    
    // 对于百度 API，可能需要转换响应格式
    if (provider === 'baidu' && response.ok) {
      const data = await response.json()
      return transformBaiduResponse(data)
    }
    
    return new NextResponse(response.body, response)
  } catch (error) {
    if (error instanceof Error) {
      return handleError(error.message)
    }
  }
}

// 转换为 OpenAI 格式 (适用于 DeepSeek、SiliconFlow 和 O3)
function transformToOpenAIFormat(body: any, model: string) {
  return {
    model: model,
    messages: body.contents.map((content: any) => ({
      role: content.role === 'user' ? 'user' : 'assistant',
      content: transformContentParts(content.parts)
    })),
    stream: true
  }
}

// 转换为百度文心一言 API 格式
function transformToBaiduFormat(body: any) {
  return {
    messages: body.contents.map((content: any) => ({
      role: content.role === 'user' ? 'user' : 'assistant',
      content: transformContentParts(content.parts)
    }))
  }
}

// 转换内容部分
function transformContentParts(parts: any[]) {
  if (!Array.isArray(parts)) return parts
  
  // 如果只有一个文本部分，直接返回文本
  if (parts.length === 1 && typeof parts[0] === 'string') {
    return parts[0]
  }
  
  // 处理多模态内容
  const contents = parts.map(part => {
    if (typeof part === 'string') {
      return part
    } else if (part.text) {
      return part.text
    } else if (part.inlineData && part.inlineData.data) {
      // 处理图像数据
      return {
        type: 'image',
        image_url: {
          url: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
        }
      }
    }
    return ''
  })
  
  // 如果所有内容都是字符串，则合并为一个字符串
  if (contents.every(item => typeof item === 'string')) {
    return contents.join('')
  }
  
  return contents
}

// 获取百度 API 的 access token
async function getBaiduAccessToken() {
  const url = `${baiduApiBaseUrl}/oauth/2.0/token?grant_type=client_credentials&client_id=${baiduApiKey}&client_secret=${baiduSecretKey}`
  const response = await fetch(url, { method: 'POST' })
  const data = await response.json()
  return data.access_token
}

// 转换百度 API 响应
function transformBaiduResponse(data: any) {
  // 将百度的响应格式转换为与其他 API 兼容的格式
  const transformedData = {
    choices: [{
      message: {
        content: data.result,
        role: 'assistant'
      }
    }]
  }
  return NextResponse.json(transformedData)
}
