"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Warehouse, Package, TrendingUp, AlertTriangle, BarChart3, Calendar, Activity, Target, Clock, MapPin } from "lucide-react"

const mockReporteBodega = {
  resumenGeneral: {
    totalPaquetes: 1234,
    paquetesEnBodega: 456,
    paquetesEntregados: 778,
    espacioUtilizado: 78.5,
    capacidadMaxima: 2000,
    rotacionPromedio: 3.2,
  },
  porEstado: [
    { estado: "En Bodega", cantidad: 456, porcentaje: 37.0, color: "blue" },
    { estado: "Entregado", cantidad: 778, porcentaje: 63.0, color: "green" },
    { estado: "En Tránsito", cantidad: 89, porcentaje: 7.2, color: "yellow" },
    { estado: "Problema", cantidad: 12, porcentaje: 1.0, color: "red" },
  ],
  porSucursal: [
    {
      sucursal: "Miami Central",
      paquetesRecibidos: 856,
      paquetesEntregados: 623,
      enBodega: 233,
      espacioUtilizado: 82.3,
      tiempoPromedioEntrega: 2.1,
    },
    {
      sucursal: "Orlando",
      paquetesRecibidos: 378,
      paquetesEntregados: 155,
      enBodega: 223,
      espacioUtilizado: 74.8,
      tiempoPromedioEntrega: 2.8,
    },
  ],
  movimientosDiarios: [
    { fecha: "2024-01-15", recibidos: 45, entregados: 38, saldo: 7 },
    { fecha: "2024-01-14", recibidos: 52, entregados: 41, saldo: 11 },
    { fecha: "2024-01-13", recibidos: 38, entregados: 45, saldo: -7 },
    { fecha: "2024-01-12", recibidos: 41, entregados: 39, saldo: 2 },
    { fecha: "2024-01-11", recibidos: 48, entregados: 42, saldo: 6 },
  ],
  alertas: [
    {
      tipo: "Capacidad",
      mensaje: "Miami Central al 82% de capacidad",
      prioridad: "Media",
      fecha: "2024-01-15",
      icon: Target
    },
    {
      tipo: "Tiempo",
      mensaje: "12 paquetes con más de 7 días en bodega",
      prioridad: "Alta",
      fecha: "2024-01-15",
      icon: Clock
    },
    {
      tipo: "Inventario",
      mensaje: "3 paquetes sin ubicación asignada",
      prioridad: "Media",
      fecha: "2024-01-14",
      icon: MapPin
    },
  ],
  analisisTemporalDetallado: [
    { mes: "Enero 2024", recibidos: 1234, entregados: 1089, eficiencia: 88.2 },
    { mes: "Diciembre 2023", recibidos: 1156, entregados: 1098, eficiencia: 95.0 },
    { mes: "Noviembre 2023", recibidos: 1089, entregados: 1034, eficiencia: 94.9 },
    { mes: "Octubre 2023", recibidos: 998, entregados: 967, eficiencia: 96.9 },
  ],
}

export default function BodegaReportePage() {
  const [fechaInicio, setFechaInicio] = useState("2024-01-01")
  const [fechaFin, setFechaFin] = useState("2024-01-31")
  const [sucursalFiltro, setSucursalFiltro] = useState("todas")
  const [tipoReporte, setTipoReporte] = useState("general")
  const [reporteData] = useState(mockReporteBodega)

  const handleGenerarReporte = () => {
    console.log("Generando reporte de bodega:", { fechaInicio, fechaFin, sucursalFiltro, tipoReporte })
  }

  const handleExportar = (formato: string) => {
    console.log(`Exportando reporte de bodega en formato ${formato}`)
  }

  const getPrioridadBadge = (prioridad: string) => {
    const variants = {
      "Alta": "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25",
      "Media": "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25",
      "Baja": "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
    }
    return variants[prioridad as keyof typeof variants] || variants.Media
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Reporte de Bodega
          </h1>
          <p className="text-slate-600 text-lg">Análisis completo de operaciones de bodega y gestión logística</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="w-4 h-4" />
            <span>Última actualización: {new Date('2025-06-15T05:55:36Z').toLocaleString('es-ES')}</span>
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
      <Card className="mb-8 bg-gradient-to-r from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Activity className="w-5 h-5 text-blue-600" />
            Filtros del Reporte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
              <Label htmlFor="sucursal" className="text-sm font-semibold text-slate-700">Sucursal</Label>
              <Select value={sucursalFiltro} onValueChange={setSucursalFiltro}>
                <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las sucursales</SelectItem>
                  <SelectItem value="miami-central">Miami Central</SelectItem>
                  <SelectItem value="orlando">Orlando</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="tipo-reporte" className="text-sm font-semibold text-slate-700">Tipo de Reporte</Label>
              <Select value={tipoReporte} onValueChange={setTipoReporte}>
                <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="movimientos">Movimientos</SelectItem>
                  <SelectItem value="eficiencia">Eficiencia</SelectItem>
                  <SelectItem value="capacidad">Capacidad</SelectItem>
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

      {/* Resumen General */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {[
          { icon: Package, label: "Total Paquetes", value: reporteData.resumenGeneral.totalPaquetes, gradient: "from-blue-500 to-blue-600" },
          { icon: Warehouse, label: "En Bodega", value: reporteData.resumenGeneral.paquetesEnBodega, gradient: "from-yellow-500 to-orange-500" },
          { icon: TrendingUp, label: "Entregados", value: reporteData.resumenGeneral.paquetesEntregados, gradient: "from-green-500 to-emerald-600" },
          { icon: BarChart3, label: "Espacio Usado", value: `${reporteData.resumenGeneral.espacioUtilizado}%`, gradient: "from-purple-500 to-purple-600" },
          { icon: Calendar, label: "Rotación Prom.", value: `${reporteData.resumenGeneral.rotacionPromedio} días`, gradient: "from-orange-500 to-orange-600" },
          { icon: Target, label: "Capacidad Máx.", value: reporteData.resumenGeneral.capacidadMaxima, gradient: "from-slate-500 to-slate-600" },
        ].map((stat, index) => (
          <Card key={index} className="group bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
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

      {/* Contenido Principal en Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              Distribución por Estado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader><TableRow className="border-slate-200"><TableHead className="font-semibold text-slate-700">Estado</TableHead><TableHead className="font-semibold text-slate-700">Cantidad</TableHead><TableHead className="font-semibold text-slate-700 w-[120px]">Porcentaje</TableHead></TableRow></TableHeader>
                <TableBody>
                  {reporteData.porEstado.map((estado, index) => (
                    <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                      <TableCell className="font-medium text-slate-800">{estado.estado}</TableCell>
                      <TableCell className="font-semibold">{estado.cantidad}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-slate-200 rounded-full h-2.5 overflow-hidden"><div className={`h-2.5 rounded-full bg-gradient-to-r ${estado.color === 'blue' ? 'from-blue-500 to-blue-600' : estado.color === 'green' ? 'from-green-500 to-emerald-600' : estado.color === 'yellow' ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-red-600'}`} style={{ width: `${estado.porcentaje}%` }}></div></div>
                          <span className="text-sm font-medium text-slate-600 min-w-[3rem] text-right">{estado.porcentaje.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              Alertas y Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reporteData.alertas.map((alerta, index) => (
                <div key={index} className="group flex items-center justify-between p-4 border border-slate-200/80 rounded-xl hover:shadow-md transition-all duration-300 bg-white/50">
                  <div className="flex items-center space-x-4"><div className={`p-2.5 rounded-lg ${alerta.prioridad === "Alta" ? "bg-gradient-to-br from-red-500 to-red-600" : "bg-gradient-to-br from-yellow-500 to-orange-500"} shadow-lg group-hover:scale-105 transition-transform duration-200`}><alerta.icon className="w-5 h-5 text-white" /></div><div><p className="text-slate-600 group-hover:text-slate-800 transition-colors text-sm">{alerta.mensaje}</p></div></div>
                  <Badge className={`${getPrioridadBadge(alerta.prioridad)} font-medium px-3 py-1`}>{alerta.prioridad}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-slate-800">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                        <MapPin className="w-5 h-5 text-white" />
                    </div>
                    Rendimiento por Sucursal
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                    <Table>
                        <TableHeader><TableRow className="border-slate-200"><TableHead className="font-semibold text-slate-700">Sucursal</TableHead><TableHead className="font-semibold text-slate-700">Recibidos</TableHead><TableHead className="font-semibold text-slate-700">Entregados</TableHead><TableHead className="font-semibold text-slate-700">En Bodega</TableHead><TableHead className="font-semibold text-slate-700">Espacio Usado</TableHead><TableHead className="font-semibold text-slate-700">Tiempo Prom.</TableHead><TableHead className="font-semibold text-slate-700">Eficiencia</TableHead></TableRow></TableHeader>
                        <TableBody>
                        {reporteData.porSucursal.map((sucursal, index) => {
                            const eficiencia = (sucursal.paquetesEntregados / sucursal.paquetesRecibidos) * 100
                            return (
                            <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                                <TableCell className="font-semibold text-slate-800">{sucursal.sucursal}</TableCell>
                                <TableCell className="font-medium">{sucursal.paquetesRecibidos}</TableCell>
                                <TableCell className="text-green-600 font-semibold">{sucursal.paquetesEntregados}</TableCell>
                                <TableCell className="text-yellow-600 font-semibold">{sucursal.enBodega}</TableCell>
                                <TableCell><div className="flex items-center gap-2"><span className="font-medium">{sucursal.espacioUtilizado}%</span><Badge className={`${sucursal.espacioUtilizado > 80 ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 'bg-gradient-to-r from-green-500 to-green-600 text-white'} shadow-lg`}>{sucursal.espacioUtilizado > 80 ? "Alto" : "Normal"}</Badge></div></TableCell>
                                <TableCell className="font-medium">{sucursal.tiempoPromedioEntrega} días</TableCell>
                                <TableCell><Badge className={`${eficiencia > 90 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-yellow-500 to-orange-500'} text-white shadow-lg`}>{eficiencia.toFixed(1)}%</Badge></TableCell>
                            </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-slate-800">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    Movimientos Diarios
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                    <Table>
                        <TableHeader><TableRow className="border-slate-200"><TableHead className="font-semibold text-slate-700">Fecha</TableHead><TableHead className="font-semibold text-slate-700">Paquetes Recibidos</TableHead><TableHead className="font-semibold text-slate-700">Paquetes Entregados</TableHead><TableHead className="font-semibold text-slate-700">Saldo del Día</TableHead><TableHead className="font-semibold text-slate-700">Estado</TableHead></TableRow></TableHeader>
                        <TableBody>
                        {reporteData.movimientosDiarios.map((dia, index) => (
                            <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                            <TableCell className="font-medium text-slate-800">{dia.fecha}</TableCell>
                            <TableCell className="text-blue-600 font-semibold">{dia.recibidos}</TableCell>
                            <TableCell className="text-green-600 font-semibold">{dia.entregados}</TableCell>
                            <TableCell><span className={`font-semibold ${dia.saldo >= 0 ? "text-green-600" : "text-red-600"}`}>{dia.saldo >= 0 ? "+" : ""}{dia.saldo}</span></TableCell>
                            <TableCell><Badge className={`${dia.saldo >= 0 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'} text-white shadow-lg`}>{dia.saldo >= 0 ? "Positivo" : "Negativo"}</Badge></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
             <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
                <CardHeader><CardTitle className="flex items-center gap-3 text-slate-800"><div className="p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl"><Calendar className="w-5 h-5 text-white" /></div>Análisis Temporal Detallado</CardTitle></CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                    <Table>
                        <TableHeader><TableRow className="border-slate-200"><TableHead className="font-semibold text-slate-700">Período</TableHead><TableHead className="font-semibold text-slate-700">Paquetes Recibidos</TableHead><TableHead className="font-semibold text-slate-700">Paquetes Entregados</TableHead><TableHead className="font-semibold text-slate-700">Eficiencia</TableHead><TableHead className="font-semibold text-slate-700">Variación</TableHead></TableRow></TableHeader>
                        <TableBody>
                        {reporteData.analisisTemporalDetallado.map((periodo, index) => {
                            const prevPeriodo = reporteData.analisisTemporalDetallado[index + 1]
                            const variacion = prevPeriodo ? periodo.eficiencia - prevPeriodo.eficiencia : 0
                            return (
                            <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                                <TableCell className="font-semibold text-slate-800">{periodo.mes}</TableCell>
                                <TableCell className="font-medium">{periodo.recibidos}</TableCell>
                                <TableCell className="font-medium">{periodo.entregados}</TableCell>
                                <TableCell><Badge className={`${periodo.eficiencia > 90 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-yellow-500 to-orange-500'} text-white shadow-lg`}>{periodo.eficiencia}%</Badge></TableCell>
                                <TableCell>{index < reporteData.analisisTemporalDetallado.length - 1 && (<span className={`font-semibold ${variacion >= 0 ? "text-green-600" : "text-red-600"}`}>{variacion >= 0 ? "+" : ""}{variacion.toFixed(1)}%</span>)}</TableCell>
                            </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}