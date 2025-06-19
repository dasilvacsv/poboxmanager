"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, Calendar, Download, Eye, CreditCard, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

export default function GlobalBilling() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('superadmin')
  const router = useRouter()
  const pathname = usePathname()

  const [billingData, setBillingData] = useState([
    {
      id: 1,
      empresa: "Miami Logistics Corp",
      plan: "Premium",
      montoMensual: 79.99,
      fechaFacturacion: "2024-01-01",
      proximaFacturacion: "2024-02-01",
      estado: "Pagada",
      metodoPago: "Tarjeta de Crédito",
      facturaNumero: "INV-2024-001",
      diasVencimiento: 0
    },
    {
      id: 2,
      empresa: "Orlando Express LLC",
      plan: "Básico",
      montoMensual: 29.99,
      fechaFacturacion: "2024-01-15",
      proximaFacturacion: "2024-02-15",
      estado: "Pendiente",
      metodoPago: "Transferencia Bancaria",
      facturaNumero: "INV-2024-002",
      diasVencimiento: 5
    },
    {
      id: 3,
      empresa: "Tampa Shipping Co",
      plan: "Empresarial",
      montoMensual: 199.99,
      fechaFacturacion: "2024-01-10",
      proximaFacturacion: "2024-02-10",
      estado: "Vencida",
      metodoPago: "Tarjeta de Crédito",
      facturaNumero: "INV-2024-003",
      diasVencimiento: 15
    },
    {
      id: 4,
      empresa: "Jacksonville Express LLC",
      plan: "Premium",
      montoMensual: 79.99,
      fechaFacturacion: "2024-01-20",
      proximaFacturacion: "2024-02-20",
      estado: "Pagada",
      metodoPago: "PayPal",
      facturaNumero: "INV-2024-004",
      diasVencimiento: 0
    }
  ])

  const [selectedPeriod, setSelectedPeriod] = useState("mes-actual")
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedBilling, setSelectedBilling] = useState<any>(null)

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const storedUserType = localStorage.getItem("userType") as 'superadmin' | 'admin' | 'client'
    
    if (!auth || storedUserType !== 'superadmin') {
      router.push("/")
    } else {
      setIsAuthenticated(true)
      setUserType(storedUserType)
    }
  }, [router])

  const handleViewDetails = (billing: any) => {
    setSelectedBilling(billing)
    setIsDetailDialogOpen(true)
  }

  const handleDownloadReport = () => {
    toast({
      title: "Reporte Generado",
      description: "El reporte de facturación ha sido descargado exitosamente.",
    })
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Pagada":
        return "bg-gradient-to-r from-green-500 to-green-600"
      case "Pendiente":
        return "bg-gradient-to-r from-orange-500 to-orange-600"
      case "Vencida":
        return "bg-gradient-to-r from-red-500 to-red-600"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  const totalFacturado = billingData.reduce((sum, b) => sum + b.montoMensual, 0)
  const facturasPagadas = billingData.filter(b => b.estado === "Pagada").length
  const facturasPendientes = billingData.filter(b => b.estado === "Pendiente").length
  const facturasVencidas = billingData.filter(b => b.estado === "Vencida").length

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25 animate-pulse">
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Cargando...</h3>
            <p className="text-slate-500">Facturación global</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar userType={userType} currentPath={pathname} />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm lg:ml-0 ml-16">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Facturación Global
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Gestión centralizada de facturación y pagos
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mes-actual">Mes Actual</SelectItem>
                  <SelectItem value="mes-anterior">Mes Anterior</SelectItem>
                  <SelectItem value="trimestre">Último Trimestre</SelectItem>
                  <SelectItem value="año">Año Actual</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleDownloadReport} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Facturado</p>
                    <p className="text-3xl font-bold text-green-600">${totalFacturado.toFixed(2)}</p>
                    <p className="text-xs text-green-500 mt-1 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12% vs mes anterior
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Facturas Pagadas</p>
                    <p className="text-3xl font-bold text-blue-600">{facturasPagadas}</p>
                    <p className="text-xs text-blue-500 mt-1">
                      {Math.round((facturasPagadas / billingData.length) * 100)}% del total
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Facturas Pendientes</p>
                    <p className="text-3xl font-bold text-orange-600">{facturasPendientes}</p>
                    <p className="text-xs text-orange-500 mt-1">Requieren seguimiento</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Facturas Vencidas</p>
                    <p className="text-3xl font-bold text-red-600">{facturasVencidas}</p>
                    <p className="text-xs text-red-500 mt-1">Acción inmediata</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Billing Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">Estado de Facturación por Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                      <TableHead className="font-semibold text-slate-700">Plan</TableHead>
                      <TableHead className="font-semibold text-slate-700">Monto Mensual</TableHead>
                      <TableHead className="font-semibold text-slate-700">Última Facturación</TableHead>
                      <TableHead className="font-semibold text-slate-700">Próxima Facturación</TableHead>
                      <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Método de Pago</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingData.map((billing) => (
                      <TableRow key={billing.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell>
                          <div className="font-semibold text-slate-800">{billing.empresa}</div>
                          <div className="text-sm text-slate-500">{billing.facturaNumero}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${
                            billing.plan === "Premium" ? "bg-gradient-to-r from-purple-500 to-purple-600" :
                            billing.plan === "Empresarial" ? "bg-gradient-to-r from-indigo-500 to-indigo-600" :
                            "bg-gradient-to-r from-blue-500 to-blue-600"
                          } text-white shadow-lg`}>
                            {billing.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-bold text-lg text-green-600">
                          ${billing.montoMensual.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-slate-600">{billing.fechaFacturacion}</TableCell>
                        <TableCell className="text-slate-600">{billing.proximaFacturacion}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getStatusColor(billing.estado)} text-white shadow-lg`}>
                              {billing.estado}
                            </Badge>
                            {billing.diasVencimiento > 0 && (
                              <span className="text-xs text-red-600 font-medium">
                                +{billing.diasVencimiento} días
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600">{billing.metodoPago}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => handleViewDetails(billing)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-green-50 hover:text-green-600"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Detail Dialog */}
          <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Detalles de Facturación - {selectedBilling?.empresa}</DialogTitle>
              </DialogHeader>
              {selectedBilling && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Información de Facturación</h3>
                        <div className="space-y-2">
                          <p><strong>Número de Factura:</strong> {selectedBilling.facturaNumero}</p>
                          <p><strong>Plan:</strong> {selectedBilling.plan}</p>
                          <p><strong>Monto Mensual:</strong> ${selectedBilling.montoMensual.toFixed(2)}</p>
                          <p><strong>Método de Pago:</strong> {selectedBilling.metodoPago}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Fechas Importantes</h3>
                        <div className="space-y-2">
                          <p><strong>Última Facturación:</strong> {selectedBilling.fechaFacturacion}</p>
                          <p><strong>Próxima Facturación:</strong> {selectedBilling.proximaFacturacion}</p>
                          <p><strong>Estado:</strong> 
                            <Badge className={`ml-2 ${getStatusColor(selectedBilling.estado)} text-white`}>
                              {selectedBilling.estado}
                            </Badge>
                          </p>
                          {selectedBilling.diasVencimiento > 0 && (
                            <p className="text-red-600"><strong>Días de Vencimiento:</strong> {selectedBilling.diasVencimiento}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                      Cerrar
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Factura
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}