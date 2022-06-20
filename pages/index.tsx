import axios, { AxiosError } from "axios"
import { useState } from "react"

type ShortenLinkResponse = {
  short_link: string;
}

type ShortenLinkError = {
  error: string;
  error_description: string;
}

const Home = () => {
  const [status, setStatus] = useState<'intial' | 'error' | 'success'>('intial')
  const [message, setMessage] = useState('')

  const onFinish = async ({ linkToShort }: string) => {
    try {
      const response = await axios.post<ShortenLinkResponse>('/api/shorten', { linkToShort})
      setStatus('success')
      setMessage(response.data?.short_link)
    } catch (error) {
      const e = error as AxiosError<ShortenLinkError>;
      setStatus('error')
      setMessage(e.response?.data?.error_description || 'Something went wrong!')
    }
  }

  const onFinishedFailed = () => {
    setStatus('error')
  }
}
