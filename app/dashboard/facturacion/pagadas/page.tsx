"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Download, CheckCircle, DollarSign, Calendar, TrendingUp, Users, CreditCard, Filter } from "lucide-react"

const mockFacturasPagadas = [
  {
    id: 1,
    numero: "FAC-001",
    cliente: "Roberto Silva",
    casillero: "PM001",
    monto: "$25.50",
    fechaFactura: "2024-01-10",
    fechaPago: "2024-01-12",
    metodoPago: "Stripe",
    concepto: "Envío de paquete - 2.5 lbs",
    referenciaPago: "pi_1234567890",
  },
  {
    id: 2,
    numero: "FAC-002",
    cliente: "Laura Fernández",
    casillero: "PM002",
    monto: "$18.75",
    fechaFactura: "2024-01-08",
    fechaPago: "2024-01-10",
    metodoPago: "PayPal",
    concepto: "Envío de paquete - 1.2 lbs",
    referenciaPago: "PAYID-123456",
  },
  {
    id: 3,
    numero: "FAC-003",
    cliente: "Miguel Torres",
    casillero: "PM003",
    monto: "$32.00",
    fechaFactura: "2024-01-05",
    fechaPago: "2024-01-07",
    metodoPago: "Zelle",
    concepto: "Envío de paquete - 3.8 lbs",
    referenciaPago: "ZEL-789012",
  },
  {
    id: 4,
    numero: "FAC-004",
    cliente: "Ana Martínez",
    casillero: "PM004",
    monto: "$45.25",
    fechaFactura: "2024-01-03",
    fechaPago: "2024-01-05",
    metodoPago: "Transferencia",
    concepto: "Envío múltiple - 5.2 lbs",
    referenciaPago: "WIRE-345678",
  },
  {
    id: 5,
    numero: "FAC-005",
    cliente: "Carlos Ruiz",
    casillero: "PM005",
    monto: "$67.80",
    fechaFactura: "2024-01-02",
    fechaPago: "2024-01-04",
    metodoPago: "Stripe",
    concepto: "Consolidación de paquetes - 8.5 lbs",
    referenciaPago: "pi_0987654321",
  },
]

export default function FacturasPagadasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroMetodo, setFiltroMetodo] = useState("todos")
  const [filtroFecha, setFiltroFecha] = useState("todos")
  const [facturas] = useState(mockFacturasPagadas)

  const filteredFacturas = facturas.filter((factura) => {
    const matchesSearch =
      factura.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      factura.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      factura.casillero.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesMetodo = filtroMetodo === "todos" || factura.metodoPago === filtroMetodo

    return matchesSearch && matchesMetodo
  })

  const totalPagado = facturas.reduce((sum, factura) => {
    return sum + Number.parseFloat(factura.monto.replace("$", ""))
  }, 0)

  const getMetodoPagoBadge = (metodo: string) => {
    const styles = {
      Stripe: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
      PayPal: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      Zelle: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
      Transferencia: "bg-gradient-to-r from-green-500 to-green-600 text-white",
    }
    return <Badge className={styles[metodo as keyof typeof styles] || "bg-gray-500 text-white"}>{metodo}</Badge>
  }

  const metodosStats = facturas.reduce((acc, factura) => {
    acc[factura.metodoPago] = (acc[factura.metodoPago] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Facturas Pagadas
              </h1>
              <p className="text-slate-600 text-lg">Historial completo de pagos y transacciones</p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 px-6 text-lg shadow-lg">
            <Download className="w-5 h-5 mr-2" />
            Exportar Reporte
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Recaudado</p>
                  <p className="text-3xl font-bold text-emerald-600">${totalPagado.toFixed(2)}</p>
                  <p className="text-xs text-emerald-500 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Facturas Pagadas</p>
                  <p className="text-3xl font-bold text-blue-600">{facturas.length}</p>
                  <p className="text-xs text-blue-500 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Este Mes</p>
                  <p className="text-3xl font-bold text-purple-600">{facturas.filter((f) => f.fechaPago.startsWith("2024-01")).length}</p>
                  <p className="text-xs text-purple-500 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Promedio por Factura</p>
                  <p className="text-3xl font-bold text-orange-600">${(totalPagado / facturas.length).toFixed(2)}</p>
                  <p className="text-xs text-orange-500 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Métodos de Pago
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(metodosStats).map(([metodo, count]) => (
                <div key={metodo} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getMetodoPagoBadge(metodo)}
                    <span className="text-sm text-slate-600">{count} facturas</span>
                  </div>
                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${(count / facturas.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tendencia de Pagos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 flex items-end justify-between">
                {[65, 78, 82, 90, 95, 88, 92].map((height, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg mb-2"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-slate-500">
                      {new Date(2024, 0, (index + 1) * 4).toLocaleDateString('es', { day: '2-digit', month: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-slate-800">Lista de Facturas Pagadas</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Buscar facturas, clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 border-slate-200 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <Select value={filtroMetodo} onValueChange={setFiltroMetodo}>
                <SelectTrigger className="w-full sm:w-64 h-12 border-2 border-slate-200 focus:border-blue-500">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Método de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los métodos</SelectItem>
                  <SelectItem value="Stripe">Stripe</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Zelle">Zelle</SelectItem>
                  <SelectItem value="Transferencia">Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-semibold text-slate-700">Número</TableHead>
                    <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                    <TableHead className="font-semibold text-slate-700">Casillero</TableHead>
                    <TableHead className="font-semibold text-slate-700">Concepto</TableHead>
                    <TableHead className="font-semibold text-slate-700">Monto</TableHead>
                    <TableHead className="font-semibold text-slate-700">Fecha Factura</TableHead>
                    <TableHead className="font-semibold text-slate-700">Fecha Pago</TableHead>
                    <TableHead className="font-semibold text-slate-700">Método Pago</TableHead>
                    <TableHead className="font-semibold text-slate-700">Referencia</TableHead>
                    <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFacturas.map((factura, index) => (
                    <TableRow key={factura.id} className="hover:bg-slate-50 transition-colors duration-200">
                      <TableCell className="font-mono text-sm font-medium text-blue-600">{factura.numero}</TableCell>
                      <TableCell className="font-medium text-slate-800">{factura.cliente}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {factura.casillero}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 max-w-xs truncate">{factura.concepto}</TableCell>
                      <TableCell className="font-bold text-lg text-emerald-600">{factura.monto}</TableCell>
                      <TableCell className="text-slate-600">{factura.fechaFactura}</TableCell>
                      <TableCell className="text-slate-600">{factura.fechaPago}</TableCell>
                      <TableCell>{getMetodoPagoBadge(factura.metodoPago)}</TableCell>
                      <TableCell className="font-mono text-xs text-slate-500 max-w-xs truncate">
                        {factura.referenciaPago}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-green-50 hover:text-green-600">
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
      </div>
    </div>
  )
}