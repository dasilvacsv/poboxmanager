"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, DollarSign, TrendingUp, TrendingDown, CreditCard, Users, FileText, BarChart3, Target, Activity } from "lucide-react"

const mockReporteData = {
  resumen: {
    totalFacturado: 15420.5,
    totalPagado: 12850.75,
    totalPendiente: 2569.75,
    facturasPagadas: 45,
    facturasPendientes: 12,
    promedioFactura: 285.64,
  },
  porMes: [
    { mes: "Enero 2024", facturado: 5420.5, pagado: 4850.75, pendiente: 569.75 },
    { mes: "Diciembre 2023", facturado: 4200.0, pagado: 4200.0, pendiente: 0 },
    { mes: "Noviembre 2023", facturado: 3800.0, pagado: 3800.0, pendiente: 0 },
    { mes: "Octubre 2023", facturado: 2000.0, pagado: 0, pendiente: 2000.0 },
  ],
  porCliente: [
    { cliente: "Roberto Silva", casillero: "PM001", facturado: 125.5, pagado: 125.5, pendiente: 0 },
    { cliente: "Laura Fernández", casillero: "PM002", facturado: 89.75, pagado: 89.75, pendiente: 0 },
    { cliente: "Miguel Torres", casillero: "PM003", facturado: 156.0, pagado: 124.0, pendiente: 32.0 },
    { cliente: "Ana Martínez", casillero: "PM004", facturado: 234.25, pagado: 234.25, pendiente: 0 },
  ],
  porMetodoPago: [
    { metodo: "Stripe", cantidad: 18, monto: 4520.5, color: "blue" },
    { metodo: "PayPal", cantidad: 12, monto: 3200.25, color: "purple" },
    { metodo: "Zelle", cantidad: 10, monto: 2850.0, color: "green" },
    { metodo: "Transferencia", cantidad: 5, monto: 2280.0, color: "orange" },
  ],
}

export default function ReporteFacturacionPage() {
  const [fechaInicio, setFechaInicio] = useState("2024-01-01")
  const [fechaFin, setFechaFin] = useState("2024-01-31")
  const [tipoReporte, setTipoReporte] = useState("mensual")
  const [reporteData] = useState(mockReporteData)

  const handleGenerarReporte = () => {
    console.log("Generando reporte de facturación:", { fechaInicio, fechaFin, tipoReporte })
  }

  const handleExportar = (formato: string) => {
    console.log(`Exportando reporte en formato ${formato}`)
  }

  const tasaCobranza = (reporteData.resumen.totalPagado / reporteData.resumen.totalFacturado) * 100

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Reporte de Facturación
          </h1>
          <p className="text-slate-600 text-lg">Análisis detallado de ingresos, facturación y métodos de pago</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <DollarSign className="w-4 h-4" />
            <span>Dashboard financiero con métricas de rendimiento</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            onClick={() => handleExportar("PDF")}
            className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Exportar PDF
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExportar("Excel")}
            className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card className="mb-8 bg-gradient-to-r from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Activity className="w-5 h-5 text-white" />
            </div>
            Filtros del Reporte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label htmlFor="fecha-inicio" className="text-sm font-semibold text-slate-700">Fecha Inicio</Label>
              <Input
                id="fecha-inicio"
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="fecha-fin" className="text-sm font-semibold text-slate-700">Fecha Fin</Label>
              <Input 
                id="fecha-fin" 
                type="date" 
                value={fechaFin} 
                onChange={(e) => setFechaFin(e.target.value)} 
                className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="tipo-reporte" className="text-sm font-semibold text-slate-700">Tipo de Reporte</Label>
              <Select value={tipoReporte} onValueChange={setTipoReporte}>
                <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diario">📅 Diario</SelectItem>
                  <SelectItem value="semanal">📊 Semanal</SelectItem>
                  <SelectItem value="mensual">📈 Mensual</SelectItem>
                  <SelectItem value="anual">🗓️ Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleGenerarReporte} 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group"
              >
                <BarChart3 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Generar Reporte
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen General - Enhanced */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {[
          { icon: DollarSign, label: "Total Facturado", value: `$${reporteData.resumen.totalFacturado.toFixed(2)}`, color: "blue", gradient: "from-blue-500 to-blue-600" },
          { icon: TrendingUp, label: "Total Pagado", value: `$${reporteData.resumen.totalPagado.toFixed(2)}`, color: "green", gradient: "from-green-500 to-emerald-600" },
          { icon: TrendingDown, label: "Total Pendiente", value: `$${reporteData.resumen.totalPendiente.toFixed(2)}`, color: "red", gradient: "from-red-500 to-red-600" },
          { icon: FileText, label: "Facturas Pagadas", value: reporteData.resumen.facturasPagadas, color: "purple", gradient: "from-purple-500 to-purple-600" },
          { icon: Calendar, label: "Facturas Pendientes", value: reporteData.resumen.facturasPendientes, color: "yellow", gradient: "from-yellow-500 to-orange-500" },
          { icon: Target, label: "Promedio Factura", value: `$${reporteData.resumen.promedioFactura.toFixed(2)}`, color: "gray", gradient: "from-slate-500 to-slate-600" },
        ].map((stat, index) => (
          <Card key={index} className="group bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 group-hover:text-slate-700 transition-colors">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tasa de Cobranza */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Tasa de Cobranza</h3>
                <p className="text-sm text-slate-600">Porcentaje de facturas cobradas exitosamente</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{tasaCobranza.toFixed(1)}%</div>
              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg mt-2">
                {tasaCobranza >= 90 ? "Excelente" : tasaCobranza >= 75 ? "Bueno" : "Mejorable"}
              </Badge>
            </div>
          </div>
          <div className="mt-4 bg-green-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${tasaCobranza}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Reporte por Mes */}
        <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              Facturación por Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="font-semibold text-slate-700">Mes</TableHead>
                    <TableHead className="font-semibold text-slate-700">Facturado</TableHead>
                    <TableHead className="font-semibold text-slate-700">Pagado</TableHead>
                    <TableHead className="font-semibold text-slate-700">Pendiente</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reporteData.porMes.map((mes, index) => (
                    <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                      <TableCell className="font-semibold text-slate-800">{mes.mes}</TableCell>
                      <TableCell className="font-semibold">${mes.facturado.toFixed(2)}</TableCell>
                      <TableCell className="text-green-600 font-semibold">${mes.pagado.toFixed(2)}</TableCell>
                      <TableCell className="text-red-600 font-semibold">${mes.pendiente.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Reporte por Método de Pago */}
        <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              Facturación por Método de Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="font-semibold text-slate-700">Método</TableHead>
                    <TableHead className="font-semibold text-slate-700">Cantidad</TableHead>
                    <TableHead className="font-semibold text-slate-700">Monto Total</TableHead>
                    <TableHead className="font-semibold text-slate-700">Promedio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reporteData.porMetodoPago.map((metodo, index) => (
                    <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                      <TableCell>
                        <Badge className={`bg-gradient-to-r ${
                          metodo.color === 'blue' ? 'from-blue-500 to-blue-600' :
                          metodo.color === 'purple' ? 'from-purple-500 to-purple-600' :
                          metodo.color === 'green' ? 'from-green-500 to-green-600' :
                          'from-orange-500 to-orange-600'
                        } text-white shadow-lg font-medium`}>
                          {metodo.metodo}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">{metodo.cantidad}</TableCell>
                      <TableCell className="font-semibold">${metodo.monto.toFixed(2)}</TableCell>
                      <TableCell className="font-semibold">${(metodo.monto / metodo.cantidad).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reporte por Cliente */}
      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <Users className="w-5 h-5 text-white" />
            </div>
            Top Clientes por Facturación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                  <TableHead className="font-semibold text-slate-700">Casillero</TableHead>
                  <TableHead className="font-semibold text-slate-700">Total Facturado</TableHead>
                  <TableHead className="font-semibold text-slate-700">Total Pagado</TableHead>
                  <TableHead className="font-semibold text-slate-700">Pendiente</TableHead>
                  <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reporteData.porCliente.map((cliente, index) => (
                  <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                    <TableCell className="font-semibold text-slate-800">{cliente.cliente}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 font-medium">
                        {cliente.casillero}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">${cliente.facturado.toFixed(2)}</TableCell>
                    <TableCell className="text-green-600 font-semibold">${cliente.pagado.toFixed(2)}</TableCell>
                    <TableCell className="text-red-600 font-semibold">${cliente.pendiente.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={`${cliente.pendiente === 0 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'} text-white shadow-lg`}>
                        {cliente.pendiente === 0 ? "Al día" : "Pendiente"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}