"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, Download, TrendingUp, DollarSign, Users, Package, Calendar, Filter } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

interface ReportData {
  clientes: {
    total: number
    activos: number
    nuevos: number
    ingresoTotal: number
  }
  paquetes: {
    totalMes: number
    entregados: number
    enTransito: number
    enBodega: number
  }
  ingresos: {
    mesActual: number
    mesAnterior: number
    crecimiento: number
    promedioPorCliente: number
  }
  rendimiento: {
    tiempoPromedio: string
    satisfaccion: number
    eficiencia: number
  }
}

const mockReportData: ReportData = {
  clientes: {
    total: 15,
    activos: 12,
    nuevos: 3,
    ingresoTotal: 45750.00
  },
  paquetes: {
    totalMes: 1247,
    entregados: 1089,
    enTransito: 98,
    enBodega: 60
  },
  ingresos: {
    mesActual: 45750,
    mesAnterior: 38900,
    crecimiento: 17.6,
    promedioPorCliente: 3812.50
  },
  rendimiento: {
    tiempoPromedio: "2.4 días",
    satisfaccion: 94.2,
    eficiencia: 97.8
  }
}

const mockClientReports = [
  {
    id: 1,
    cliente: "Miami Logistics Corp",
    paquetes: 342,
    ingresos: 12400.00,
    crecimiento: 15.2,
    ultimaFactura: "2024-01-15"
  },
  {
    id: 2,
    cliente: "Orlando Express LLC",
    paquetes: 189,
    ingresos: 8950.00,
    crecimiento: -5.1,
    ultimaFactura: "2024-01-14"
  },
  {
    id: 3,
    cliente: "Tampa Shipping Co",
    paquetes: 78,
    ingresos: 4200.00,
    crecimiento: 25.8,
    ultimaFactura: "2024-01-13"
  }
]

export default function SuperAdminReports() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('superadmin')
  const router = useRouter()
  const pathname = usePathname()

  const [reportData] = useState<ReportData>(mockReportData)
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedClient, setSelectedClient] = useState("all")
  const [isCustomReportOpen, setIsCustomReportOpen] = useState(false)
  const [customReport, setCustomReport] = useState({
    fechaInicio: "",
    fechaFin: "",
    tipo: "ingresos",
    cliente: "all"
  })

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

  const handleDownloadReport = (type: string) => {
    toast({
      title: "Descargando reporte",
      description: `El reporte de ${type} se está descargando...`
    })
  }

  const handleGenerateCustomReport = () => {
    if (!customReport.fechaInicio || !customReport.fechaFin) {
      toast({
        title: "Error",
        description: "Por favor selecciona las fechas del reporte",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Reporte generado",
      description: "El reporte personalizado ha sido generado exitosamente"
    })
    setIsCustomReportOpen(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25 animate-pulse">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Reportes Globales</h3>
            <p className="text-slate-500">Cargando análisis de datos...</p>
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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Reportes Globales
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Análisis y métricas del sistema completo
              </p>
            </div>
            <div className="flex gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                  <SelectItem value="quarter">Este trimestre</SelectItem>
                  <SelectItem value="year">Este año</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isCustomReportOpen} onOpenChange={setIsCustomReportOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-2 border-blue-200 hover:bg-blue-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Reporte Personalizado
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Ingresos Totales</p>
                    <p className="text-3xl font-bold text-green-600">
                      ${reportData.clientes.ingresoTotal.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-500 mt-1 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{reportData.ingresos.crecimiento}% vs mes anterior
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Clientes Activos</p>
                    <p className="text-3xl font-bold text-blue-600">{reportData.clientes.activos}</p>
                    <p className="text-xs text-blue-500 mt-1">
                      {reportData.clientes.nuevos} nuevos este mes
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Paquetes Este Mes</p>
                    <p className="text-3xl font-bold text-purple-600">{reportData.paquetes.totalMes}</p>
                    <p className="text-xs text-purple-500 mt-1">
                      {reportData.paquetes.entregados} entregados
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Eficiencia</p>
                    <p className="text-3xl font-bold text-orange-600">{reportData.rendimiento.eficiencia}%</p>
                    <p className="text-xs text-orange-500 mt-1">
                      Tiempo promedio: {reportData.rendimiento.tiempoPromedio}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">Distribución de Paquetes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Entregados</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-600">{reportData.paquetes.entregados}</span>
                      <p className="text-sm text-slate-500">
                        {((reportData.paquetes.entregados / reportData.paquetes.totalMes) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">En Tránsito</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-600">{reportData.paquetes.enTransito}</span>
                      <p className="text-sm text-slate-500">
                        {((reportData.paquetes.enTransito / reportData.paquetes.totalMes) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <span className="font-medium">En Bodega</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-yellow-600">{reportData.paquetes.enBodega}</span>
                      <p className="text-sm text-slate-500">
                        {((reportData.paquetes.enBodega / reportData.paquetes.totalMes) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">Métricas de Rendimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Satisfacción del Cliente</span>
                      <span className="text-lg font-bold text-green-600">{reportData.rendimiento.satisfaccion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                        style={{ width: `${reportData.rendimiento.satisfaccion}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Eficiencia Operativa</span>
                      <span className="text-lg font-bold text-blue-600">{reportData.rendimiento.eficiencia}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                        style={{ width: `${reportData.rendimiento.eficiencia}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold mb-2">Tiempo Promedio de Entrega</h4>
                    <p className="text-3xl font-bold text-purple-600">{reportData.rendimiento.tiempoPromedio}</p>
                    <p className="text-sm text-slate-500 mt-1">Mejora del 12% vs mes anterior</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Client Performance Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-800">Rendimiento por Cliente</CardTitle>
                <Button
                  onClick={() => handleDownloadReport('clientes')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                      <TableHead className="font-semibold text-slate-700">Paquetes</TableHead>
                      <TableHead className="font-semibold text-slate-700">Ingresos</TableHead>
                      <TableHead className="font-semibold text-slate-700">Crecimiento</TableHead>
                      <TableHead className="font-semibold text-slate-700">Última Factura</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClientReports.map((client) => (
                      <TableRow key={client.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell className="font-semibold text-slate-800">{client.cliente}</TableCell>
                        <TableCell className="font-mono text-lg font-bold text-blue-600">{client.paquetes}</TableCell>
                        <TableCell className="font-bold text-lg text-green-600">
                          ${client.ingresos.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${
                            client.crecimiento > 0 
                              ? 'bg-gradient-to-r from-green-500 to-green-600' 
                              : 'bg-gradient-to-r from-red-500 to-red-600'
                          } text-white shadow-lg`}>
                            {client.crecimiento > 0 ? '+' : ''}{client.crecimiento}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{client.ultimaFactura}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadReport(`cliente-${client.id}`)}
                            className="hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">Exportar Reportes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  onClick={() => handleDownloadReport('ingresos')}
                  className="h-20 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex flex-col space-y-2"
                >
                  <DollarSign className="w-6 h-6" />
                  <span>Reporte de Ingresos</span>
                </Button>
                <Button
                  onClick={() => handleDownloadReport('paquetes')}
                  className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex flex-col space-y-2"
                >
                  <Package className="w-6 h-6" />
                  <span>Reporte de Paquetes</span>
                </Button>
                <Button
                  onClick={() => handleDownloadReport('clientes')}
                  className="h-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 flex flex-col space-y-2"
                >
                  <Users className="w-6 h-6" />
                  <span>Reporte de Clientes</span>
                </Button>
                <Button
                  onClick={() => handleDownloadReport('rendimiento')}
                  className="h-20 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 flex flex-col space-y-2"
                >
                  <BarChart3 className="w-6 h-6" />
                  <span>Reporte de Rendimiento</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Custom Report Dialog */}
        <Dialog open={isCustomReportOpen} onOpenChange={setIsCustomReportOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generar Reporte Personalizado</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fechaInicio">Fecha Inicio</Label>
                  <Input
                    id="fechaInicio"
                    type="date"
                    value={customReport.fechaInicio}
                    onChange={(e) => setCustomReport(prev => ({ ...prev, fechaInicio: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="fechaFin">Fecha Fin</Label>
                  <Input
                    id="fechaFin"
                    type="date"
                    value={customReport.fechaFin}
                    onChange={(e) => setCustomReport(prev => ({ ...prev, fechaFin: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipo">Tipo de Reporte</Label>
                  <Select
                    value={customReport.tipo}
                    onValueChange={(value) => setCustomReport(prev => ({ ...prev, tipo: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ingresos">Ingresos</SelectItem>
                      <SelectItem value="paquetes">Paquetes</SelectItem>
                      <SelectItem value="clientes">Clientes</SelectItem>
                      <SelectItem value="rendimiento">Rendimiento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cliente">Cliente (Opcional)</Label>
                  <Select
                    value={customReport.cliente}
                    onValueChange={(value) => setCustomReport(prev => ({ ...prev, cliente: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los clientes</SelectItem>
                      <SelectItem value="miami-logistics">Miami Logistics Corp</SelectItem>
                      <SelectItem value="orlando-express">Orlando Express LLC</SelectItem>
                      <SelectItem value="tampa-shipping">Tampa Shipping Co</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCustomReportOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleGenerateCustomReport}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}