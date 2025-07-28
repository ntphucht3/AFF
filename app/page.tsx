"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Phone, MessageCircle, Shield } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { supabase } from "@/lib/supabase"
import AdminLoginModal from "@/components/admin-login-modal"
import MobileNavigation from "@/components/mobile-navigation"
import Image from "next/image"
import MobileSidebar from "@/components/mobile-sidebar"

interface LoanPackage {
  id: string
  name: string
  slug: string
  description: string
  loan_limit: string
  interest_rate: string
  disbursement_speed: string
  logo: string
  image: string
  register_link: string
  detail_link: string
}

interface Consultant {
  id: string
  name: string
  avatar: string
  phone: string
  zalo: string
  facebook: string
  email: string
  credit_cards: string
  loans: string
  ewallets: string
  zalo_link?: string
}

interface NavbarLink {
  id: string
  title: string
  url: string
}

const chartData = [
  { name: "TNEX", value: 18, color: "#3B82F6", approved: 1250 },
  { name: "VIB", value: 15, color: "#10B981", approved: 980 },
  { name: "HDBank", value: 14, color: "#F59E0B", approved: 890 },
  { name: "VPBank", value: 13, color: "#EF4444", approved: 750 },
  { name: "FCredit", value: 12, color: "#8B5CF6", approved: 680 },
  { name: "Lotte", value: 11, color: "#06B6D4", approved: 620 },
  { name: "Muadee", value: 10, color: "#F97316", approved: 580 },
  { name: "CUB", value: 7, color: "#84CC16", approved: 420 },
]

export default function HomePage() {
  const [loanPackages, setLoanPackages] = useState<LoanPackage[]>([])
  const [consultant, setConsultant] = useState<Consultant | null>(null)
  const [navbarLinks, setNavbarLinks] = useState<NavbarLink[]>([])
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch loan packages
      const { data: packages } = await supabase
        .from("loan_packages")
        .select("*")
        .order("created_at", { ascending: true })

      // Fetch consultant info
      const { data: consultants } = await supabase.from("consultants").select("*").limit(1).single()

      // Fetch navbar links
      const { data: links } = await supabase.from("navbar_links").select("*").order("created_at", { ascending: true })

      setLoanPackages(packages || [])
      setConsultant(consultants)
      setNavbarLinks(links || [])
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">FinZ.vn</span>
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center space-x-4">
              {/* Mobile Hamburger Menu */}
              <MobileSidebar consultant={consultant} navbarLinks={navbarLinks} />

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Trang chủ
                </a>
                {navbarLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {link.title}
                  </a>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdminModal(true)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Admin
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Main Title */}
      <section className="py-8 md:py-12 px-4 bg-gradient-to-br from-blue-600/5 via-cyan-50/30 to-blue-100/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-3xl blur-3xl"></div>

            {/* Main title */}
            <div className="relative z-10 space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 leading-tight">
                💳 GIỚI THIỆU SẢN PHẨM
                <br />
                <span className="text-2xl md:text-4xl lg:text-5xl">THẺ TÍN DỤNG & KHOẢN VAY TIÊU DÙNG</span>
              </h1>

              <div className="flex items-center justify-center space-x-8 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Uy tín - Minh bạch</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Tư vấn chuyên nghiệp</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">87%</div>
                  <div className="text-xs text-slate-500">Tỷ lệ duyệt</div>
                </div>
                <div className="w-px h-8 bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">6,170+</div>
                  <div className="text-xs text-slate-500">Khách hàng</div>
                </div>
                <div className="w-px h-8 bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-xs text-slate-500">Hỗ trợ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page Introduction Section */}
      <section className="py-6 md:py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200/50 rounded-2xl p-8 shadow-sm">
            <div className="space-y-6">
              {/* Main Introduction with Avatar */}
              <div className="flex items-start space-x-4">
                {/* Consultant Avatar */}
                {consultant && (
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shadow-md">
                      {consultant.avatar ? (
                        <Image
                          src={consultant.avatar || "/placeholder.svg"}
                          alt={consultant.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 text-2xl">👤</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Introduction Text */}
                <div className="flex-1 text-sm text-slate-700 leading-relaxed">
                  <p className="mb-4">
                    Trang giới thiệu này được xây dựng và vận hành bởi{" "}
                    <span className="font-semibold text-slate-800">PhucNguyen</span> – người trực tiếp chịu trách nhiệm
                    tư vấn và phân phối các sản phẩm thẻ tín dụng và khoản vay tiêu dùng từ các công ty tài chính uy tín
                    tại Việt Nam.
                  </p>

                  <div className="mb-4">
                    <p className="font-medium text-slate-800 mb-2">Mục đích:</p>
                    <ul className="space-y-1 ml-4">
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Giới thiệu các sản phẩm phù hợp nhất với hồ sơ khách hàng</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Hỗ trợ toàn bộ quy trình đăng ký vay hoặc mở thẻ một cách minh bạch, an toàn</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Tư vấn rõ ràng, trách nhiệm đến khi giải ngân thành công</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <h3 className="font-semibold text-slate-800 text-sm">Thông tin liên hệ chính thức:</h3>
                </div>

                <p className="text-sm text-slate-600 mb-4">
                  Tôi chỉ sử dụng duy nhất 2 kênh để tương tác và hỗ trợ khách hàng mở thẻ và lên hồ sơ:
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => window.open("tel:0888979809", "_self")}
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">0888.979.809</span>
                  </Button>

                  <Button
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => window.open("https://zalo.me/0888979809", "_blank")}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-medium">Zalo: 0888.979.809</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Packages Grid */}
      <section className="py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {loanPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className="group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-md rounded-2xl w-[320px] flex-shrink-0"
              >
                <CardContent className="p-4 space-y-4">
                  {/* Header với Logo, Tên và Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        {pkg.logo ? (
                          <Image
                            src={pkg.logo || "/placeholder.svg"}
                            alt={pkg.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 text-xs">🏦</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-base text-gray-900 truncate">{pkg.name}</h3>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs flex-shrink-0 ml-2">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      4.9/5
                    </Badge>
                  </div>

                  {/* Ảnh đại diện tổ chức */}
                  <div className="flex justify-center">
                    {pkg.image ? (
                      <div className="w-full max-w-[280px] h-32 rounded-xl overflow-hidden bg-gray-50">
                        <Image
                          src={pkg.image || "/placeholder.svg"}
                          alt={pkg.name}
                          width={280}
                          height={128}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-full max-w-[280px] h-32 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <div className="text-3xl mb-1">📷</div>
                          <div className="text-xs">Ảnh đại diện</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Thông tin chi tiết */}
                  <div className="space-y-1 bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">💰</span>
                        <span className="text-sm text-gray-600">Hạn mức vay:</span>
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{pkg.loan_limit}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600">📈</span>
                        <span className="text-sm text-gray-600">Lãi suất:</span>
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{pkg.interest_rate}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-orange-600">⏱️</span>
                        <span className="text-sm text-gray-600">Giải ngân:</span>
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{pkg.disbursement_speed}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center space-x-3 pt-2">
                    <Button
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white border-0 text-sm rounded-full flex-1 max-w-[130px]"
                      onClick={() => {
                        if (pkg.register_link && pkg.register_link.trim() !== "") {
                          window.open(pkg.register_link, "_blank", "noopener,noreferrer")
                        } else {
                          console.log("No register link available for", pkg.name)
                        }
                      }}
                    >
                      🔘 ĐĂNG KÝ
                    </Button>
                    <Button
                      variant="outline"
                      className="px-4 py-2 border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent text-sm rounded-full flex-1 max-w-[130px]"
                      onClick={() => {
                        if (pkg.detail_link && pkg.detail_link.trim() !== "") {
                          window.open(pkg.detail_link, "_blank", "noopener,noreferrer")
                        } else {
                          console.log("No detail link available for", pkg.name)
                        }
                      }}
                    >
                      🔍 CHI TIẾT
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Chart */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50/80 to-blue-50/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-slate-800 mb-4 tracking-wide">Thống Kê Tỷ Lệ Duyệt Hồ Sơ</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-6"></div>
            <p className="text-slate-600 text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Dữ liệu thực tế từ hơn 6,000 khách hàng đã được hỗ trợ thành công
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg"></div>
              <div className="relative h-96 p-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      innerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, name: any, props: any) => [
                        `${value}% (${props.payload.approved} người)`,
                        "Tỷ lệ duyệt",
                      ]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#64748b",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-emerald-400/90 to-teal-500/90 p-8 rounded-2xl text-white shadow-lg backdrop-blur-sm">
                  <div className="text-4xl font-light mb-2">6,170</div>
                  <div className="text-emerald-50 font-light text-sm tracking-wide">Hồ sơ được duyệt</div>
                </div>
                <div className="bg-gradient-to-br from-blue-400/90 to-indigo-500/90 p-8 rounded-2xl text-white shadow-lg backdrop-blur-sm">
                  <div className="text-4xl font-light mb-2">87%</div>
                  <div className="text-blue-50 font-light text-sm tracking-wide">Tỷ lệ thành công</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-400/90 to-orange-500/90 p-8 rounded-2xl text-white shadow-lg backdrop-blur-sm">
                <div className="text-3xl font-light mb-2">950 hồ sơ</div>
                <div className="text-amber-50 font-light text-sm tracking-wide leading-relaxed">
                  Chưa đủ điều kiện (được tư vấn cải thiện)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">FinZ.vn</span>
          </div>
          <p className="text-gray-400 mb-4">
            Nơi bạn an tâm tìm kiếm các gói vay và thẻ uy tín từ các tổ chức tài chính thuộc các ngân hàng
          </p>
          <p className="text-sm text-gray-500">© 2024 FinZ.vn. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <MobileNavigation navbarLinks={navbarLinks} />

      {/* Admin Login Modal */}
      <AdminLoginModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} />
    </div>
  )
}
