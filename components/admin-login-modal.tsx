"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [username, setUsername] = useState("haidang")
  const [password, setPassword] = useState("123456")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simple authentication check
    if (username === "haidang" && password === "123456") {
      localStorage.setItem("admin_authenticated", "true")
      toast({
        title: "Đăng nhập thành công",
        description: "Chuyển hướng đến trang quản trị...",
      })
      onClose()
      router.push("/admin")
    } else {
      toast({
        title: "Đăng nhập thất bại",
        description: "Tên đăng nhập hoặc mật khẩu không đúng",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Đăng nhập Admin</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex space-x-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
