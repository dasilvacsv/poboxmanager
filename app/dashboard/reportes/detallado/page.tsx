"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Download, TrendingUp, Users, Package, DollarSign, BarChart3, Calendar, Star, Clock, Target, Activity } from "lucide-react"

const mockReporteDetallado = {
  resumenGeneral: {
    totalClientes: 156,
    clientesActivos: 142,
    totalPaquetes: 1234,
    paquetesEntregados: 1089,
    totalFacturado: 25420.5,
    totalPagado: 22850.75,
    ingresosMes: 5420.5,
    crecimientoMensual: 12.5,
  },
  rendimientoPorSucursal: [
    {
      sucursal: "Miami Central",
      clientes: 89,
      paquetes: 756,
      ingresos: 18420.5,
      satisfaccion: 4.8,
    },
    {
      sucursal: "Orlando",
      clientes: 67,
      paquetes: 478,
      ingresos: 7000.0,
      satisfaccion: 4.6,
    },
  ],
  analisisTemporal: [
    { periodo: "Enero 2024", clientes: 156, paquetes: 234, ingresos: 5420.5 },
    { periodo: "Diciembre 2023", clientes: 142, paquetes: 198, ingresos: 4200.0 },
    { periodo: "Noviembre 2023", clientes: 138, paquetes: 176, ingresos: 3800.0 },
    { periodo: "Octubre 2023", clientes: 134, paquetes: 165, ingresos: 3200.0 },
    { periodo: "Septiembre 2023", clientes: 128, paquetes: 154, ingresos: 2900.0 },
    { periodo: "Agosto 2023", clientes: 125, paquetes: 143, ingresos: 2650.0 },
  ],
  topClientes: [
    {
      cliente: "Tech Solutions Inc",
      tipo: "Empresa",
      paquetes: 45,
      ingresos: 1250.0,
      ultimaActividad: "2024-01-15",
    },
    {
      cliente: "Roberto Silva",
      tipo: "Individual",
      paquetes: 28,
      ingresos: 780.5,
      ultimaActividad: "2024-01-14",
    },
    {
      cliente: "Global Imports LLC",
      tipo: "Empresa",
      paquetes: 32,
      ingresos: 920.0,
      ultimaActividad: "2024-01-13",
    },
  ],
  analisisOperacional: {
    tiempoPromedioEntrega: 2.3,
    tasaEntregaExitosa: 98.5,
    paquetesPorDia: 15.6,
    horasPicoOperacion: "10:00 AM - 2:00 PM",
    diasMayorActividad: "Martes y Miércoles",
  },
  proyecciones: {
    clientesProyectados: 180,
    ingresosProyectados: 32000.0,
    crecimientoEsperado: 18.2,
    metaMensual: 28000.0,
  },
}

const SectionTrigger = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-3 text-slate-800">
        <div className="p-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg">
            <Icon className="w-5 h-5 text-slate-600" />
        </div>
        <span className="font-semibold text-lg">{children}</span>
    </div>
);


export default function ReporteDetalladoPage() {
  const [fechaInicio, setFechaInicio] = useState("2024-01-01")
  const [fechaFin, setFechaFin] = useState("2024-01-31")
  const [tipoAnalisis, setTipoAnalisis] = useState("completo")
  const [reporteData] = useState(mockReporteDetallado)

  const handleGenerarReporte = () => {
    console.log("Generando reporte detallado:", { fechaInicio, fechaFin, tipoAnalisis })
  }

  const handleExportar = (formato: string) => {
    console.log(`Exportando reporte detallado en formato ${formato}`)
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Reporte Detallado
          </h1>
          <p className="text-slate-600 text-lg">Análisis completo del rendimiento y métricas del negocio</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard ejecutivo con insights avanzados</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => handleExportar("PDF")}
            className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            PDF Completo
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExportar("Excel")}
            className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Excel Detallado
          </Button>
        </div>
      </div>

      <Card className="mb-8 bg-gradient-to-r from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Activity className="w-5 h-5 text-white" />
            </div>
            Configuración del Reporte
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
              <Label htmlFor="tipo-analisis" className="text-sm font-semibold text-slate-700">Tipo de Análisis</Label>
              <Select value={tipoAnalisis} onValueChange={setTipoAnalisis}>
                <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completo">Análisis Completo</SelectItem>
                  <SelectItem value="financiero">Solo Financiero</SelectItem>
                  <SelectItem value="operacional">Solo Operacional</SelectItem>
                  <SelectItem value="clientes">Solo Clientes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleGenerarReporte}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group"
              >
                <BarChart3 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Actualizar Reporte
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible defaultValue="resumen" className="w-full space-y-2">
        <AccordionItem value="resumen" className="border-none">
            <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-lg">
                <AccordionTrigger className="p-6 hover:no-underline">
                    <SectionTrigger icon={BarChart3}>Resumen General y Operacional</SectionTrigger>
                </AccordionTrigger>
                <AccordionContent className="px-6">
                    <div className="space-y-6 pt-2 pb-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Users, label: "Total Clientes", value: reporteData.resumenGeneral.totalClientes, subtitle: `${reporteData.resumenGeneral.clientesActivos} activos`, gradient: "from-blue-500 to-blue-600" },
                            { icon: Package, label: "Total Paquetes", value: reporteData.resumenGeneral.totalPaquetes, subtitle: `${reporteData.resumenGeneral.paquetesEntregados} entregados`, gradient: "from-green-500 to-emerald-600" },
                            { icon: DollarSign, label: "Total Facturado", value: `$${reporteData.resumenGeneral.totalFacturado.toFixed(2)}`, subtitle: `$${reporteData.resumenGeneral.totalPagado.toFixed(2)} pagado`, gradient: "from-purple-500 to-purple-600" },
                            { icon: TrendingUp, label: "Crecimiento", value: `${reporteData.resumenGeneral.crecimientoMensual}%`, subtitle: "vs mes anterior", gradient: "from-yellow-500 to-orange-500" },
                        ].map((stat, index) => (
                            <Card key={index} className="group bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-4">
                                    <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-all duration-300`}>
                                        <stat.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                                        <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                                        <p className="text-xs text-green-600 font-medium">{stat.subtitle}</p>
                                    </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                            <div className="space-y-6">
                                <h4 className="font-semibold text-slate-700 text-base flex items-center gap-2"><Clock className="w-5 h-5 text-blue-500" />Eficiencia de Entrega</h4>
                                <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-slate-100/80 rounded-lg"><span className="text-sm font-medium text-slate-600">Tiempo promedio:</span><span className="font-semibold text-slate-800">{reporteData.analisisOperacional.tiempoPromedioEntrega} días</span></div>
                                <div className="flex justify-between items-center p-3 bg-green-100/60 rounded-lg"><span className="text-sm font-medium text-slate-600">Tasa de éxito:</span><span className="font-semibold text-green-600">{reporteData.analisisOperacional.tasaEntregaExitosa}%</span></div>
                                <div className="flex justify-between items-center p-3 bg-blue-100/60 rounded-lg"><span className="text-sm font-medium text-slate-600">Paquetes/día:</span><span className="font-semibold text-blue-600">{reporteData.analisisOperacional.paquetesPorDia}</span></div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h4 className="font-semibold text-slate-700 text-base flex items-center gap-2"><Target className="w-5 h-5 text-purple-500" />Patrones de Actividad</h4>
                                <div className="space-y-3">
                                    <div className="p-3 bg-purple-100/60 rounded-lg"><span className="text-sm font-medium text-slate-600">Horas pico:</span><p className="font-semibold text-slate-800 mt-1">{reporteData.analisisOperacional.horasPicoOperacion}</p></div>
                                    <div className="p-3 bg-orange-100/60 rounded-lg"><span className="text-sm font-medium text-slate-600">Días más activos:</span><p className="font-semibold text-slate-800 mt-1">{reporteData.analisisOperacional.diasMayorActividad}</p></div>
                                </div>
                            </div>
                             <div className="space-y-6">
                                <h4 className="font-semibold text-slate-700 text-base flex items-center gap-2"><BarChart3 className="w-5 h-5 text-green-500" />Métricas Clave</h4>
                                <div className="space-y-4 pt-1">
                                    <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200/80">
                                    <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-600">Eficiencia Global</span><Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">Excelente</Badge></div>
                                    <div className="mt-2 bg-green-200 rounded-full h-2"><div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '92%' }}></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>
        
        <AccordionItem value="sucursales" className="border-none">
            <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-lg">
                <AccordionTrigger className="p-6 hover:no-underline">
                     <SectionTrigger icon={Target}>Rendimiento por Sucursal</SectionTrigger>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                    <div className="overflow-x-auto">
                        <Table>
                        <TableHeader><TableRow className="border-slate-200"><TableHead className="font-semibold text-slate-700">Sucursal</TableHead><TableHead className="font-semibold text-slate-700">Clientes</TableHead><TableHead className="font-semibold text-slate-700">Paquetes</TableHead><TableHead className="font-semibold text-slate-700">Ingresos</TableHead><TableHead className="font-semibold text-slate-700">Satisfacción</TableHead><TableHead className="font-semibold text-slate-700">Rendimiento</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {reporteData.rendimientoPorSucursal.map((sucursal, index) => (
                            <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                                <TableCell className="font-semibold text-slate-800">{sucursal.sucursal}</TableCell>
                                <TableCell className="font-medium">{sucursal.clientes}</TableCell>
                                <TableCell className="font-medium">{sucursal.paquetes}</TableCell>
                                <TableCell className="font-semibold">${sucursal.ingresos.toFixed(2)}</TableCell>
                                <TableCell><div className="flex items-center gap-2"><div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /><span className="font-medium">{sucursal.satisfaccion}/5</span></div><Badge className={`${sucursal.satisfaccion >= 4.5 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-yellow-500 to-orange-500'} text-white shadow-lg`}>{sucursal.satisfaccion >= 4.5 ? "Excelente" : "Bueno"}</Badge></div></TableCell>
                                <TableCell><Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">${(sucursal.ingresos / sucursal.paquetes).toFixed(2)}/paquete</Badge></TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>

        <AccordionItem value="temporal" className="border-none">
            <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-lg">
                <AccordionTrigger className="p-6 hover:no-underline">
                     <SectionTrigger icon={Calendar}>Análisis Temporal</SectionTrigger>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                    <div className="overflow-x-auto">
                        <Table>
                        <TableHeader><TableRow className="border-slate-200"><TableHead className="font-semibold text-slate-700">Período</TableHead><TableHead className="font-semibold text-slate-700">Clientes</TableHead><TableHead className="font-semibold text-slate-700">Paquetes</TableHead><TableHead className="font-semibold text-slate-700">Ingresos</TableHead><TableHead className="font-semibold text-slate-700">Crecimiento</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {reporteData.analisisTemporal.map((periodo, index) => {
                            const prevPeriodo = reporteData.analisisTemporal[index + 1]
                            const crecimiento = prevPeriodo ? ((periodo.ingresos - prevPeriodo.ingresos) / prevPeriodo.ingresos) * 100 : 0
                            return (
                                <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                                <TableCell className="font-semibold text-slate-800">{periodo.periodo}</TableCell>
                                <TableCell className="font-medium">{periodo.clientes}</TableCell>
                                <TableCell className="font-medium">{periodo.paquetes}</TableCell>
                                <TableCell className="font-semibold">${periodo.ingresos.toFixed(2)}</TableCell>
                                <TableCell>{index < reporteData.analisisTemporal.length - 1 && (<Badge className={`${crecimiento >= 0 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'} text-white shadow-lg`}>{crecimiento >= 0 ? "+" : ""}{crecimiento.toFixed(1)}%</Badge>)}</TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                        </Table>
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>

        <AccordionItem value="clientes" className="border-none">
             <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-lg">
                <AccordionTrigger className="p-6 hover:no-underline">
                    <SectionTrigger icon={Users}>Top Clientes</SectionTrigger>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                     <div className="overflow-x-auto">
                        <Table>
                        <TableHeader><TableRow className="border-slate-200"><TableHead className="font-semibold text-slate-700">Cliente</TableHead><TableHead className="font-semibold text-slate-700">Tipo</TableHead><TableHead className="font-semibold text-slate-700">Paquetes</TableHead><TableHead className="font-semibold text-slate-700">Ingresos</TableHead><TableHead className="font-semibold text-slate-700">Promedio/Paquete</TableHead><TableHead className="font-semibold text-slate-700">Última Actividad</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {reporteData.topClientes.map((cliente, index) => (
                            <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                                <TableCell className="font-semibold text-slate-800">{cliente.cliente}</TableCell>
                                <TableCell><Badge className={`${cliente.tipo === "Empresa" ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-green-500 to-green-600'} text-white shadow-lg`}>{cliente.tipo}</Badge></TableCell>
                                <TableCell className="font-medium">{cliente.paquetes}</TableCell>
                                <TableCell className="font-semibold">${cliente.ingresos.toFixed(2)}</TableCell>
                                <TableCell className="font-semibold">${(cliente.ingresos / cliente.paquetes).toFixed(2)}</TableCell>
                                <TableCell className="font-medium">{cliente.ultimaActividad}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>

        <AccordionItem value="proyecciones" className="border-none">
            <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-lg">
                <AccordionTrigger className="p-6 hover:no-underline">
                    <SectionTrigger icon={TrendingUp}>Proyecciones y Metas</SectionTrigger>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h4 className="font-semibold text-slate-700 text-lg flex items-center gap-2"><Target className="w-5 h-5 text-blue-500" />Proyecciones para el Próximo Mes</h4>
                            <div className="space-y-4">
                            {[
                                { label: "Clientes proyectados", value: reporteData.proyecciones.clientesProyectados, color: "blue" },
                                { label: "Ingresos proyectados", value: `$${reporteData.proyecciones.ingresosProyectados.toFixed(2)}`, color: "green" },
                                { label: "Crecimiento esperado", value: `${reporteData.proyecciones.crecimientoEsperado}%`, color: "purple" }
                            ].map((item, index) => (
                                <div key={index} className={`flex justify-between items-center p-4 bg-${item.color}-50 rounded-xl border border-${item.color}-200`}><span className="text-sm font-medium text-slate-600">{item.label}:</span><span className={`font-semibold text-${item.color}-600`}>{item.value}</span></div>
                            ))}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-semibold text-slate-700 text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5 text-green-500" />Metas del Mes</h4>
                            <div className="space-y-4">
                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                <div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-slate-600">Meta de ingresos:</span><span className="font-semibold text-slate-800">${reporteData.proyecciones.metaMensual.toFixed(2)}</span></div>
                                <div className="flex justify-between items-center mb-3"><span className="text-sm font-medium text-slate-600">Progreso actual:</span><span className="font-semibold text-green-600">{((reporteData.resumenGeneral.ingresosMes / reporteData.proyecciones.metaMensual) * 100).toFixed(1)}%</span></div>
                                <div className="w-full bg-green-200 rounded-full h-3 overflow-hidden">
                                <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out" style={{width: `${Math.min((reporteData.resumenGeneral.ingresosMes / reporteData.proyecciones.metaMensual) * 100, 100)}%`,}}></div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </AccordionContent>
            </Card>
        </AccordionItem>
      </Accordion>
    </div>
  )
}