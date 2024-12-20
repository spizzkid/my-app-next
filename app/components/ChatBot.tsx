'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function ChatBot() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).CozeWebSDK) {
      new (window as any).CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7450089017360187431',
        },
        componentProps: {
          title: 'Coze',
        },
      });
    }
  }, []);

  return (
    <Script
      src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.1.0-beta.0/libs/cn/index.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && (window as any).CozeWebSDK) {
          new (window as any).CozeWebSDK.WebChatClient({
            config: {
              bot_id: '7450089017360187431',
            },
            componentProps: {
              title: 'Coze',
            },
          });
        }
      }}
    />
  );
} 