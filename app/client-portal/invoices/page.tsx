"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Eye, CreditCard, Search, Filter, Calendar, DollarSign } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

interface Factura {
  id: number
  numero: string
  fecha: string
  fechaVencimiento: string
  monto: number
  estado: 'Pagada' | 'Pendiente' | 'Vencida' | 'Procesando'
  sucursal: string
  concepto: string
  metodoPago?: string
  fechaPago?: string
  paquetes: number
  descuentos: number
  impuestos: number
  total: number
}

const mockFacturas: Factura[] = [
  {
    id: 1,
    numero: "FAC-2024-001",
    fecha: "2024-01-01",
    fechaVencimiento: "2024-01-31",
    monto: 125.50,
    estado: "Pagada",
    sucursal: "Miami Central",
    concepto: "Servicios de recepción de paquetes - Enero 2024",
    metodoPago: "Tarjeta de Crédito",
    fechaPago: "2024-01-15",
    paquetes: 45,
    descuentos: 5.50,
    impuestos: 10.00,
    total: 130.00
  },
  {
    id: 2,
    numero: "FAC-2024-002",
    fecha: "2024-01-05",
    fechaVencimiento: "2024-02-05",
    monto: 89.75,
    estado: "Pendiente",
    sucursal: "Miami Airport",
    concepto: "Servicios de almacenamiento y delivery",
    paquetes: 32,
    descuentos: 0,
    impuestos: 7.18,
    total: 96.93
  },
  {
    id: 3,
    numero: "FAC-2024-003",
    fecha: "2024-01-10",
    fechaVencimiento: "2024-01-25",
    monto: 156.25,
    estado: "Vencida",
    sucursal: "Miami Beach",
    concepto: "Servicios premium y consolidación",
    paquetes: 67,
    descuentos: 12.50,
    impuestos: 12.50,
    total: 156.25
  },
  {
    id: 4,
    numero: "FAC-2024-004",
    fecha: "2024-01-12",
    fechaVencimiento: "2024-02-12",
    monto: 234.80,
    estado: "Procesando",
    sucursal: "Miami Central",
    concepto: "Servicios empresariales - Plan Premium",
    paquetes: 89,
    descuentos: 15.20,
    impuestos: 18.78,
    total: 238.38
  }
]

export default function ClientInvoices() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('client')
  const router = useRouter()
  const pathname = usePathname()

  const [facturas, setFacturas] = useState<Factura[]>(mockFacturas)
  const [filteredFacturas, setFilteredFacturas] = useState<Factura[]>(mockFacturas)
  const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)

  const [filters, setFilters] = useState({
    search: "",
    estado: "all",
    sucursal: "all",
    fechaDesde: "",
    fechaHasta: ""
  })

  const [paymentData, setPaymentData] = useState({
    metodo: "",
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
    nombreTitular: ""
  })

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const storedUserType = localStorage.getItem("userType") as 'superadmin' | 'admin' | 'client'
    
    if (!auth || storedUserType !== 'client') {
      router.push("/")
    } else {
      setIsAuthenticated(true)
      setUserType(storedUserType)
    }
  }, [router])

  useEffect(() => {
    let filtered = facturas

    if (filters.search) {
      filtered = filtered.filter(f => 
        f.numero.toLowerCase().includes(filters.search.toLowerCase()) ||
        f.concepto.toLowerCase().includes(filters.search.toLowerCase()) ||
        f.sucursal.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.estado !== "all") {
      filtered = filtered.filter(f => f.estado === filters.estado)
    }

    if (filters.sucursal !== "all") {
      filtered = filtered.filter(f => f.sucursal === filters.sucursal)
    }

    if (filters.fechaDesde) {
      filtered = filtered.filter(f => f.fecha >= filters.fechaDesde)
    }

    if (filters.fechaHasta) {
      filtered = filtered.filter(f => f.fecha <= filters.fechaHasta)
    }

    setFilteredFacturas(filtered)
  }, [filters, facturas])

  const handleViewDetail = (factura: Factura) => {
    setSelectedFactura(factura)
    setIsDetailDialogOpen(true)
  }

  const handlePayInvoice = (factura: Factura) => {
    setSelectedFactura(factura)
    setIsPaymentDialogOpen(true)
  }

  const handleProcessPayment = () => {
    if (!selectedFactura || !paymentData.metodo) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos de pago",
        variant: "destructive"
      })
      return
    }

    setFacturas(prev => prev.map(f => 
      f.id === selectedFactura.id 
        ? { 
            ...f, 
            estado: 'Pagada' as Factura['estado'],
            metodoPago: paymentData.metodo,
            fechaPago: new Date().toISOString().split('T')[0]
          }
        : f
    ))

    setIsPaymentDialogOpen(false)
    setPaymentData({
      metodo: "",
      numeroTarjeta: "",
      fechaExpiracion: "",
      cvv: "",
      nombreTitular: ""
    })

    toast({
      title: "Pago procesado exitosamente",
      description: `La factura ${selectedFactura.numero} ha sido pagada`
    })
  }

  const handleDownloadInvoice = (factura: Factura) => {
    toast({
      title: "Descargando factura",
      description: `Descargando ${factura.numero}...`
    })
  }

  const getStatusBadgeClass = (estado: Factura['estado']) => {
    switch (estado) {
      case 'Pagada':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      case 'Pendiente':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
      case 'Vencida':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white'
      case 'Procesando':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
    }
  }

  const totalFacturado = facturas.reduce((sum, f) => sum + f.total, 0)
  const totalPagado = facturas.filter(f => f.estado === 'Pagada').reduce((sum, f) => sum + f.total, 0)
  const totalPendiente = facturas.filter(f => f.estado === 'Pendiente').reduce((sum, f) => sum + f.total, 0)
  const totalVencido = facturas.filter(f => f.estado === 'Vencida').reduce((sum, f) => sum + f.total, 0)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25 animate-pulse">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Gestión de Facturas</h3>
            <p className="text-slate-500">Cargando tus facturas...</p>
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
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Gestión de Facturas
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Administra y paga tus facturas de servicios
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Facturado</p>
                    <p className="text-3xl font-bold text-blue-600">${totalFacturado.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Pagado</p>
                    <p className="text-3xl font-bold text-green-600">${totalPagado.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Pendiente de Pago</p>
                    <p className="text-3xl font-bold text-orange-600">${totalPendiente.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Facturas Vencidas</p>
                    <p className="text-3xl font-bold text-red-600">${totalVencido.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar facturas..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
                <Select value={filters.estado} onValueChange={(value) => setFilters(prev => ({ ...prev, estado: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="Pagada">Pagada</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Vencida">Vencida</SelectItem>
                    <SelectItem value="Procesando">Procesando</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filters.sucursal} onValueChange={(value) => setFilters(prev => ({ ...prev, sucursal: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las sucursales</SelectItem>
                    <SelectItem value="Miami Central">Miami Central</SelectItem>
                    <SelectItem value="Miami Airport">Miami Airport</SelectItem>
                    <SelectItem value="Miami Beach">Miami Beach</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={filters.fechaDesde}
                  onChange={(e) => setFilters(prev => ({ ...prev, fechaDesde: e.target.value }))}
                  placeholder="Fecha desde"
                />
                <Input
                  type="date"
                  value={filters.fechaHasta}
                  onChange={(e) => setFilters(prev => ({ ...prev, fechaHasta: e.target.value }))}
                  placeholder="Fecha hasta"
                />
              </div>
            </CardContent>
          </Card>

          {/* Invoices Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">
                Facturas ({filteredFacturas.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Número</TableHead>
                      <TableHead className="font-semibold text-slate-700">Fecha</TableHead>
                      <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>
                      <TableHead className="font-semibold text-slate-700">Concepto</TableHead>
                      <TableHead className="font-semibold text-slate-700">Monto</TableHead>
                      <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Vencimiento</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFacturas.map((factura) => (
                      <TableRow key={factura.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell className="font-mono text-sm font-medium text-blue-600">
                          {factura.numero}
                        </TableCell>
                        <TableCell className="text-slate-600">{factura.fecha}</TableCell>
                        <TableCell className="font-medium text-slate-800">{factura.sucursal}</TableCell>
                        <TableCell className="max-w-xs truncate text-slate-600">{factura.concepto}</TableCell>
                        <TableCell className="font-bold text-lg text-green-600">
                          ${factura.total.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusBadgeClass(factura.estado)} shadow-lg`}>
                            {factura.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{factura.fechaVencimiento}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetail(factura)}
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownloadInvoice(factura)}
                              className="hover:bg-green-50 hover:text-green-600"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            {(factura.estado === 'Pendiente' || factura.estado === 'Vencida') && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePayInvoice(factura)}
                                className="hover:bg-purple-50 hover:text-purple-600"
                              >
                                <CreditCard className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalle de Factura</DialogTitle>
            </DialogHeader>
            {selectedFactura && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-800">Información General</h3>
                    <div className="space-y-2 mt-2">
                      <p><span className="font-medium">Número:</span> {selectedFactura.numero}</p>
                      <p><span className="font-medium">Fecha:</span> {selectedFactura.fecha}</p>
                      <p><span className="font-medium">Vencimiento:</span> {selectedFactura.fechaVencimiento}</p>
                      <p><span className="font-medium">Sucursal:</span> {selectedFactura.sucursal}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Estado y Pago</h3>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Estado:</span>
                        <Badge className={getStatusBadgeClass(selectedFactura.estado)}>
                          {selectedFactura.estado}
                        </Badge>
                      </div>
                      {selectedFactura.metodoPago && (
                        <p><span className="font-medium">Método de Pago:</span> {selectedFactura.metodoPago}</p>
                      )}
                      {selectedFactura.fechaPago && (
                        <p><span className="font-medium">Fecha de Pago:</span> {selectedFactura.fechaPago}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">Concepto</h3>
                  <p className="text-slate-600">{selectedFactura.concepto}</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800 mb-3">Desglose de Costos</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Paquetes procesados:</span>
                      <span className="font-medium">{selectedFactura.paquetes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-medium">${selectedFactura.monto.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Descuentos:</span>
                      <span className="font-medium">-${selectedFactura.descuentos.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impuestos:</span>
                      <span className="font-medium">${selectedFactura.impuestos.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">${selectedFactura.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleDownloadInvoice(selectedFactura)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar PDF
                  </Button>
                  {(selectedFactura.estado === 'Pendiente' || selectedFactura.estado === 'Vencida') && (
                    <Button
                      onClick={() => {
                        setIsDetailDialogOpen(false)
                        handlePayInvoice(selectedFactura)
                      }}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pagar Ahora
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Procesar Pago</DialogTitle>
            </DialogHeader>
            {selectedFactura && (
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-800">Resumen de Pago</h3>
                  <div className="mt-2 space-y-1">
                    <p><span className="font-medium">Factura:</span> {selectedFactura.numero}</p>
                    <p><span className="font-medium">Monto:</span> <span className="text-green-600 font-bold">${selectedFactura.total.toFixed(2)}</span></p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Método de Pago</label>
                    <Select value={paymentData.metodo} onValueChange={(value) => setPaymentData(prev => ({ ...prev, metodo: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar método" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tarjeta">Tarjeta de Crédito</SelectItem>
                        <SelectItem value="debito">Tarjeta de Débito</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="transferencia">Transferencia Bancaria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentData.metodo === 'tarjeta' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Número de Tarjeta</label>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.numeroTarjeta}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, numeroTarjeta: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Fecha Exp.</label>
                          <Input
                            placeholder="MM/YY"
                            value={paymentData.fechaExpiracion}
                            onChange={(e) => setPaymentData(prev => ({ ...prev, fechaExpiracion: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV</label>
                          <Input
                            placeholder="123"
                            value={paymentData.cvv}
                            onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Nombre del Titular</label>
                        <Input
                          placeholder="Nombre completo"
                          value={paymentData.nombreTitular}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, nombreTitular: e.target.value }))}
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleProcessPayment}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Procesar Pago
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}