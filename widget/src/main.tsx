import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './styles.css'

function mount() {
  // Find our own script tag to read data-business-id
  const scriptTag =
    document.currentScript as HTMLScriptElement | null ??
    document.querySelector('script[data-business-id]') as HTMLScriptElement | null

  const businessId = scriptTag?.getAttribute('data-business-id') ?? ''

  // Create an isolated container so the widget doesn't inherit host page styles
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

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}
