import { buttonDarkTheme, buttonLightTheme } from './elements.js'

export default function Theme() {
    function applyTheme(themeName) {
        localStorage.setItem('theme', themeName)
        document.documentElement.className = themeName
        if (themeName === 'theme-dark') {
            buttonLightTheme.classList.add('hide')
            buttonDarkTheme.classList.remove('hide')
        } else {
            buttonDarkTheme.classList.add('hide')
            buttonLightTheme.classList.remove('hide')
        }
    }

    function toggle() {
        const currentTheme = localStorage.getItem('theme') || 'theme-light'
        const newTheme = currentTheme === 'theme-dark' ? 'theme-light' : 'theme-dark'
        applyTheme(newTheme)
    }

    // Initialize theme on load
    const savedTheme = localStorage.getItem('theme') || 'theme-light'
    applyTheme(savedTheme)

    return {
        toggle,
        applyTheme
    }
}
