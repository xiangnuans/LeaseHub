import { NextResponse } from 'next/server';
export async function GET() {
  const status = {
    status: 'ok',
    timestamp: new Date().toLocaleString(),
    message: 'Server is running',
  };
  return NextResponse.json(status)
}
