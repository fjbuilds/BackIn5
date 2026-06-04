import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles.css'

function mount(businessId: string) {
  const container = document.createElement('div')
  container.id = 'backin5-widget-root'
  container.style.cssText =
    'position:fixed;bottom:24px;right:24px;z-index:2147483647;font-family:inherit;'
  document.body.appendChild(container)

  createRoot(container).render(
    <StrictMode>
      <App businessId={businessId} />
    </StrictMode>,
  )
}

// Expose global so demo pages can call BackIn5.mount('business-id')
;(window as unknown as Record<string, unknown>).BackIn5 = { mount }

// Also auto-mount from any script tag that carries data-business-id
function autoMount() {
  const tag = document.querySelector('script[data-business-id]') as HTMLScriptElement | null
  const id = tag?.getAttribute('data-business-id')
  if (id) mount(id)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoMount)
} else {
  autoMount()
}
