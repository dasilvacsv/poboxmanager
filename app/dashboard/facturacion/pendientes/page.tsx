"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, DollarSign, Clock, AlertCircle, CheckCircle, Send, TrendingUp, Users, Calendar } from "lucide-react"

const mockInvoices = [
  {
    id: 1,
    numero: "FAC-001",
    cliente: "Roberto Silva",
    casillero: "PM001",
    monto: "$25.50",
    fechaVencimiento: "2024-01-20",
    diasVencido: 0,
    concepto: "Envío de paquete - 2.5 lbs",
    telefono: "+1 (555) 123-4567",
    email: "roberto@email.com",
  },
  {
    id: 2,
    numero: "FAC-002",
    cliente: "Laura Fernández",
    casillero: "PM002",
    monto: "$18.75",
    fechaVencimiento: "2024-01-18",
    diasVencido: 2,
    concepto: "Envío de paquete - 1.2 lbs",
    telefono: "+1 (555) 234-5678",
    email: "laura@email.com",
  },
  {
    id: 3,
    numero: "FAC-003",
    cliente: "Miguel Torres",
    casillero: "PM003",
    monto: "$32.00",
    fechaVencimiento: "2024-01-15",
    diasVencido: 5,
    concepto: "Envío de paquete - 3.8 lbs",
    telefono: "+1 (555) 345-6789",
    email: "miguel@email.com",
  },
  {
    id: 4,
    numero: "FAC-004",
    cliente: "Carmen López",
    casillero: "PM004",
    monto: "$67.80",
    fechaVencimiento: "2024-01-12",
    diasVencido: 8,
    concepto: "Consolidación - 8.5 lbs",
    telefono: "+1 (555) 456-7890",
    email: "carmen@email.com",
  },
]

export default function FacturasPendientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [invoices] = useState(mockInvoices)
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([])

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.casillero.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (diasVencido: number) => {
    if (diasVencido === 0) {
      return (
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <Clock className="w-3 h-3 mr-1" />
          Pendiente
        </Badge>
      )
    } else if (diasVencido <= 7) {
      return (
        <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <AlertCircle className="w-3 h-3 mr-1" />
          Vencida ({diasVencido}d)
        </Badge>
      )
    } else {
      return (
        <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <AlertCircle className="w-3 h-3 mr-1" />
          Crítica ({diasVencido}d)
        </Badge>
      )
    }
  }

  const getUrgencyColor = (diasVencido: number) => {
    if (diasVencido === 0) return "border-l-yellow-500"
    if (diasVencido <= 7) return "border-l-red-500"
    return "border-l-red-700"
  }

  const totalPendiente = invoices.reduce((sum, invoice) => {
    return sum + Number.parseFloat(invoice.monto.replace("$", ""))
  }, 0)

  const handleSelectInvoice = (id: number) => {
    setSelectedInvoices(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedInvoices(
      selectedInvoices.length === filteredInvoices.length 
        ? []
        : filteredInvoices.map(inv => inv.id)
    )
  }

  const handleBulkReminder = () => {
    // Implementar envío masivo de recordatorios
    console.log("Sending reminders to:", selectedInvoices)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Facturas Pendientes
              </h1>
              <p className="text-slate-600 text-lg">Gestiona y da seguimiento a los pagos pendientes</p>
            </div>
          </div>
          {selectedInvoices.length > 0 && (
            <div className="flex gap-3">
              <Button 
                onClick={handleBulkReminder}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 px-6 shadow-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Recordatorios ({selectedInvoices.length})
              </Button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Pendiente</p>
                  <p className="text-3xl font-bold text-red-600">${totalPendiente.toFixed(2)}</p>
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Facturas Pendientes</p>
                  <p className="text-3xl font-bold text-yellow-600">{invoices.filter((i) => i.diasVencido === 0).length}</p>
                  <p className="text-xs text-yellow-500 mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Próximas a vencer
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Facturas Vencidas</p>
                  <p className="text-3xl font-bold text-red-600">{invoices.filter((i) => i.diasVencido > 0).length}</p>
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Requieren atención
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Promedio de Días</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {Math.round(invoices.reduce((sum, inv) => sum + inv.diasVencido, 0) / invoices.length)}
                  </p>
                  <p className="text-xs text-orange-500 mt-1 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Días promedio vencidos
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Facturas Críticas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.filter(inv => inv.diasVencido > 7).map(invoice => (
                  <div key={invoice.id} className="bg-white/20 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{invoice.cliente}</p>
                        <p className="text-sm opacity-90">{invoice.numero} - {invoice.monto}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{invoice.diasVencido} días</p>
                        <p className="text-xs opacity-90">vencida</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Próximas a Vencer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.filter(inv => inv.diasVencido === 0).map(invoice => (
                  <div key={invoice.id} className="bg-white/20 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{invoice.cliente}</p>
                        <p className="text-sm opacity-90">{invoice.numero} - {invoice.monto}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">Hoy</p>
                        <p className="text-xs opacity-90">vence</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-slate-800">Lista de Facturas Pendientes</CardTitle>
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
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleSelectAll}
                  className="h-12 px-4 border-2 border-slate-200 hover:border-blue-500"
                >
                  {selectedInvoices.length === filteredInvoices.length ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="w-12">
                      <input
                        type="checkbox"
                        checked={selectedInvoices.length === filteredInvoices.length}
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700">Número</TableHead>
                    <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                    <TableHead className="font-semibold text-slate-700">Casillero</TableHead>
                    <TableHead className="font-semibold text-slate-700">Concepto</TableHead>
                    <TableHead className="font-semibold text-slate-700">Monto</TableHead>
                    <TableHead className="font-semibold text-slate-700">Fecha Vencimiento</TableHead>
                    <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                    <TableHead className="font-semibold text-slate-700">Contacto</TableHead>
                    <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow 
                      key={invoice.id} 
                      className={`hover:bg-slate-50 transition-colors duration-200 border-l-4 ${getUrgencyColor(invoice.diasVencido)}`}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedInvoices.includes(invoice.id)}
                          onChange={() => handleSelectInvoice(invoice.id)}
                          className="rounded"
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm font-medium text-blue-600">{invoice.numero}</TableCell>
                      <TableCell className="font-medium text-slate-800">{invoice.cliente}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {invoice.casillero}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 max-w-xs truncate">{invoice.concepto}</TableCell>
                      <TableCell className="font-bold text-lg text-red-600">{invoice.monto}</TableCell>
                      <TableCell className="text-slate-600">{invoice.fechaVencimiento}</TableCell>
                      <TableCell>{getStatusBadge(invoice.diasVencido)}</TableCell>
                      <TableCell>
                        <div className="text-xs text-slate-500">
                          <div className="truncate max-w-32">{invoice.email}</div>
                          <div className="truncate max-w-32">{invoice.telefono}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover:bg-green-50 hover:text-green-600"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover:bg-yellow-50 hover:text-yellow-600"
                          >
                            <Send className="w-4 h-4" />
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