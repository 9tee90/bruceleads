import { useEffect } from "react"

type ModifierKey = "alt" | "ctrl" | "meta" | "shift"
type Key = string
type Callback = (e: KeyboardEvent) => void

function parseHotkey(hotkey: string): { modifiers: ModifierKey[]; key: Key } {
  const parts = hotkey.toLowerCase().split("+")
  const key = parts.pop() as Key
  const modifiers = parts as ModifierKey[]
  return { modifiers, key }
}

export function useHotkeys(hotkey: string, callback: Callback) {
  useEffect(() => {
    const { modifiers, key } = parseHotkey(hotkey)

    function handleKeyDown(e: KeyboardEvent) {
      const isHotkeyPressed =
        key === e.key.toLowerCase() &&
        modifiers.every((modifier) => e.getModifierState(modifier))

      if (isHotkeyPressed) {
        e.preventDefault()
        callback(e)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [hotkey, callback])
} 