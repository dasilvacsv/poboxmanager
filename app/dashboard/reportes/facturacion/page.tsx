"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Filter, BarChart3, DollarSign, TrendingUp, Package, FileText, Building } from "lucide-react"

const mockReporteData = {
  resumen: {
    totalFacturado: 15750.25,
    totalPaquetes: 234,
    promedioFactura: 67.31,
    crecimientoMensual: 12.5,
  },
  facturasPorSucursal: [
    { sucursal: "Miami Central", facturas: 89, monto: 8950.5, paquetes: 145 },
    { sucursal: "Orlando Express", facturas: 45, monto: 4200.75, paquetes: 67 },
    { sucursal: "Tampa Bay", facturas: 23, monto: 2599.0, paquetes: 22 },
  ],
  facturasPorPlan: [
    { plan: "Plan Regular", facturas: 78, monto: 6750.25, porcentaje: 42.9 },
    { plan: "Plan Emprendedor", facturas: 45, monto: 4200.5, porcentaje: 26.7 },
    { plan: "Plan Marítimo Premium", facturas: 34, monto: 4799.5, porcentaje: 30.4 },
  ],
  facturasDetalladas: [
    {
      id: 1,
      numero: "FAC-2024-001",
      cliente: "Roberto Silva",
      sucursal: "Miami Central",
      plan: "Plan Regular",
      fecha: "2024-01-15",
      monto: 125.5,
      estado: "Pagada",
      paquetes: 3,
    },
    {
      id: 2,
      numero: "FAC-2024-002",
      cliente: "Global Imports LLC",
      sucursal: "Miami Central",
      plan: "Plan Marítimo Premium",
      fecha: "2024-01-14",
      monto: 450.75,
      estado: "Pendiente",
      paquetes: 8,
    },
    {
      id: 3,
      numero: "FAC-2024-003",
      cliente: "María González",
      sucursal: "Orlando Express",
      plan: "Plan Emprendedor",
      fecha: "2024-01-13",
      monto: 89.25,
      estado: "Pagada",
      paquetes: 2,
    },
  ],
}

export default function ReporteFacturacionPage() {
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    sucursal: "Todas las Sucursales",
    plan: "Todos los Planes",
    estado: "",
  })

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const exportarReporte = (formato: string) => {
    console.log(`Exportando reporte en formato ${formato}`)
  }

  const aplicarFiltros = () => {
    console.log("Aplicando filtros:", filtros)
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Reporte de Facturación
          </h1>
          <p className="text-slate-600 text-lg">Análisis detallado de ingresos, facturas y tendencias</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BarChart3 className="w-4 h-4" />
            <span>Datos actualizados en tiempo real</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => exportarReporte("PDF")}
            className="bg-white/80 backdrop-blur-sm border-slate-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => exportarReporte("Excel")}
            className="bg-white/80 backdrop-blur-sm border-slate-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: DollarSign,
            label: "Total Facturado",
            value: `$${mockReporteData.resumen.totalFacturado.toFixed(2)}`,
            color: "green",
            gradient: "from-green-500 to-green-600",
            trend: `+${mockReporteData.resumen.crecimientoMensual}%`,
          },
          {
            icon: FileText,
            label: "Total Facturas",
            value: mockReporteData.facturasPorSucursal.reduce((sum, s) => sum + s.facturas, 0),
            color: "blue",
            gradient: "from-blue-500 to-blue-600",
            trend: "+8.2%",
          },
          {
            icon: Package,
            label: "Paquetes Facturados",
            value: mockReporteData.resumen.totalPaquetes,
            color: "purple",
            gradient: "from-purple-500 to-purple-600",
            trend: "+15.3%",
          },
          {
            icon: TrendingUp,
            label: "Promedio por Factura",
            value: `$${mockReporteData.resumen.promedioFactura.toFixed(2)}`,
            color: "orange",
            gradient: "from-orange-500 to-orange-600",
            trend: "+5.7%",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className="group bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 group-hover:text-slate-700 transition-colors">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-500 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.trend} este mes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8 bg-gradient-to-r from-white to-slate-50/50 border-slate-200/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Filter className="w-5 h-5 text-white" />
            </div>
            Filtros de Reporte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-3">
              <Label htmlFor="fechaInicio" className="text-sm font-semibold text-slate-700">
                Fecha Inicio
              </Label>
              <Input
                id="fechaInicio"
                type="date"
                value={filtros.fechaInicio}
                onChange={(e) => handleFiltroChange("fechaInicio", e.target.value)}
                className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="fechaFin" className="text-sm font-semibold text-slate-700">
                Fecha Fin
              </Label>
              <Input
                id="fechaFin"
                type="date"
                value={filtros.fechaFin}
                onChange={(e) => handleFiltroChange("fechaFin", e.target.value)}
                className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="sucursal" className="text-sm font-semibold text-slate-700">
                Sucursal
              </Label>
              <Select value={filtros.sucursal} onValueChange={(value) => handleFiltroChange("sucursal", value)}>
                <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                  <SelectValue placeholder="Todas las Sucursales" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todas las Sucursales">Todas las Sucursales</SelectItem>
                  <SelectItem value="Miami Central">Miami Central</SelectItem>
                  <SelectItem value="Orlando Express">Orlando Express</SelectItem>
                  <SelectItem value="Tampa Bay">Tampa Bay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="plan" className="text-sm font-semibold text-slate-700">
                Plan
              </Label>
              <Select value={filtros.plan} onValueChange={(value) => handleFiltroChange("plan", value)}>
                <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                  <SelectValue placeholder="Todos los Planes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos los Planes">Todos los Planes</SelectItem>
                  <SelectItem value="Plan Regular">Plan Regular</SelectItem>
                  <SelectItem value="Plan Emprendedor">Plan Emprendedor</SelectItem>
                  <SelectItem value="Plan Marítimo Premium">Plan Marítimo Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700">Acción</Label>
              <Button
                onClick={aplicarFiltros}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Filter className="w-4 h-4 mr-2" />
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <Building className="w-5 h-5 text-white" />
              </div>
              Facturación por Sucursal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReporteData.facturasPorSucursal.map((sucursal, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{sucursal.sucursal}</p>
                      <p className="text-sm text-slate-500">
                        {sucursal.facturas} facturas • {sucursal.paquetes} paquetes
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-green-600">${sucursal.monto.toFixed(2)}</p>
                    <p className="text-xs text-slate-500">
                      {((sucursal.monto / mockReporteData.resumen.totalFacturado) * 100).toFixed(1)}% del total
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              Facturación por Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockReporteData.facturasPorPlan.map((plan, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant="outline"
                        className={`${
                          plan.plan === "Plan Marítimo Premium"
                            ? "bg-purple-50 border-purple-200 text-purple-700"
                            : plan.plan === "Plan Emprendedor"
                              ? "bg-green-50 border-green-200 text-green-700"
                              : "bg-blue-50 border-blue-200 text-blue-700"
                        } font-medium`}
                      >
                        {plan.plan}
                      </Badge>
                      <span className="text-sm text-slate-500">{plan.facturas} facturas</span>
                    </div>
                    <span className="font-bold text-lg text-purple-600">${plan.monto.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${plan.porcentaje}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500 text-right">{plan.porcentaje}% del total</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
              <FileText className="w-5 h-5 text-white" />
            </div>
            Facturas Detalladas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Número</TableHead>
                  <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                  <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>
                  <TableHead className="font-semibold text-slate-700">Plan</TableHead>
                  <TableHead className="font-semibold text-slate-700">Fecha</TableHead>
                  <TableHead className="font-semibold text-slate-700">Paquetes</TableHead>
                  <TableHead className="font-semibold text-slate-700">Monto</TableHead>
                  <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockReporteData.facturasDetalladas.map((factura) => (
                  <TableRow key={factura.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                    <TableCell className="font-mono text-sm font-medium text-blue-600">{factura.numero}</TableCell>
                    <TableCell className="font-medium text-slate-800">{factura.cliente}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400" />
                        <span className="text-sm text-slate-600">{factura.sucursal}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          factura.plan === "Plan Marítimo Premium"
                            ? "bg-purple-50 border-purple-200 text-purple-700"
                            : factura.plan === "Plan Emprendedor"
                              ? "bg-green-50 border-green-200 text-green-700"
                              : "bg-blue-50 border-blue-200 text-blue-700"
                        } font-medium text-xs`}
                      >
                        {factura.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{factura.fecha}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3 text-slate-400" />
                        <span className="font-medium">{factura.paquetes}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-lg text-green-600">${factura.monto.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          factura.estado === "Pagada"
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : "bg-gradient-to-r from-orange-500 to-orange-600"
                        } text-white shadow-lg`}
                      >
                        {factura.estado}
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
