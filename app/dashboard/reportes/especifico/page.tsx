"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Filter, Search, Settings, FileText, Users, Package, DollarSign, Calendar, Target, Loader2 } from "lucide-react"

export default function ReporteEspecificoPage() {
  const [filtros, setFiltros] = useState({
    tipoReporte: "clientes",
    fechaInicio: "2024-01-01",
    fechaFin: "2024-01-31",
    cliente: "",
    casillero: "",
    estado: "todos",
    sucursal: "todas",
    metodoPago: "todos",
  })

  const [columnas, setColumnas] = useState({
    fecha: true,
    cliente: true,
    casillero: true,
    descripcion: true,
    peso: true,
    valor: true,
    estado: true,
    factura: false,
    metodoPago: false,
    sucursal: false,
  })

  const [reporteData, setReporteData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const mockData = {
    clientes: [
      {
        fecha: "2024-01-15",
        cliente: "Roberto Silva",
        casillero: "PM001",
        descripcion: "Electrónicos",
        peso: "2.5 lbs",
        valor: "$150.00",
        estado: "Entregado",
        factura: "FAC-001",
        metodoPago: "Stripe",
        sucursal: "Miami Central",
      },
      {
        fecha: "2024-01-14",
        cliente: "Laura Fernández",
        casillero: "PM002",
        descripcion: "Ropa",
        peso: "1.2 lbs",
        valor: "$75.00",
        estado: "En Bodega",
        factura: "FAC-002",
        metodoPago: "PayPal",
        sucursal: "Miami Central",
      },
    ],
    paquetes: [
      {
        fecha: "2024-01-15",
        tracking: "TRK001234567",
        cliente: "Roberto Silva",
        casillero: "PM001",
        descripcion: "Electrónicos",
        peso: "2.5 lbs",
        valor: "$150.00",
        estado: "Entregado",
      },
    ],
    facturas: [
      {
        fecha: "2024-01-15",
        numero: "FAC-001",
        cliente: "Roberto Silva",
        casillero: "PM001",
        monto: "$25.50",
        estado: "Pagada",
        metodoPago: "Stripe",
      },
    ],
  }

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const handleColumnaChange = (columna: string, checked: boolean) => {
    setColumnas((prev) => ({
      ...prev,
      [columna]: checked,
    }))
  }

  const handleGenerarReporte = () => {
    setIsLoading(true)
    setTimeout(() => {
      setReporteData(mockData[filtros.tipoReporte as keyof typeof mockData] || [])
      setIsLoading(false)
    }, 1500)
  }

  const handleExportar = (formato: string) => {
    console.log(`Exportando reporte específico en formato ${formato}`)
  }

  const tipoReporteConfig = {
    clientes: { icon: Users, color: "blue", label: "Clientes" },
    paquetes: { icon: Package, color: "green", label: "Paquetes" },
    facturas: { icon: DollarSign, color: "purple", label: "Facturas" }
  }

  const currentConfig = tipoReporteConfig[filtros.tipoReporte as keyof typeof tipoReporteConfig]

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Reporte Específico
          </h1>
          <p className="text-slate-600 text-lg">Genera reportes personalizados con filtros avanzados y columnas configurables</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Settings className="w-4 h-4" />
            <span>Sistema de reportes flexible y personalizable</span>
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Panel de Filtros */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5 sticky top-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                Filtros del Reporte
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="tipo-reporte" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <currentConfig.icon className="w-4 h-4" />
                  Tipo de Reporte
                </Label>
                <Select value={filtros.tipoReporte} onValueChange={(value) => handleFiltroChange("tipoReporte", value)}>
                  <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clientes">📊 Clientes</SelectItem>
                    <SelectItem value="paquetes">📦 Paquetes</SelectItem>
                    <SelectItem value="facturas">💰 Facturas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="fecha-inicio" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Fecha Inicio
                  </Label>
                  <Input
                    id="fecha-inicio"
                    type="date"
                    value={filtros.fechaInicio}
                    onChange={(e) => handleFiltroChange("fechaInicio", e.target.value)}
                    className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="fecha-fin" className="text-sm font-semibold text-slate-700">Fecha Fin</Label>
                  <Input
                    id="fecha-fin"
                    type="date"
                    value={filtros.fechaFin}
                    onChange={(e) => handleFiltroChange("fechaFin", e.target.value)}
                    className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="cliente" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Cliente Específico
                </Label>
                <Input
                  id="cliente"
                  value={filtros.cliente}
                  onChange={(e) => handleFiltroChange("cliente", e.target.value)}
                  placeholder="Nombre del cliente"
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="casillero" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Casillero
                </Label>
                <Input
                  id="casillero"
                  value={filtros.casillero}
                  onChange={(e) => handleFiltroChange("casillero", e.target.value)}
                  placeholder="Ej: PM001"
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="estado" className="text-sm font-semibold text-slate-700">Estado</Label>
                  <Select value={filtros.estado} onValueChange={(value) => handleFiltroChange("estado", value)}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="entregado">Entregado</SelectItem>
                      <SelectItem value="en-bodega">En Bodega</SelectItem>
                      <SelectItem value="en-transito">En Tránsito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="sucursal" className="text-sm font-semibold text-slate-700">Sucursal</Label>
                  <Select value={filtros.sucursal} onValueChange={(value) => handleFiltroChange("sucursal", value)}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="miami-central">Miami Central</SelectItem>
                      <SelectItem value="orlando">Orlando</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleGenerarReporte} 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group h-12" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Generar Reporte
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Selección de Columnas */}
          <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                Columnas a Mostrar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(columnas).map(([columna, checked]) => (
                  <div key={columna} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-xl transition-colors">
                    <Checkbox
                      id={columna}
                      checked={checked}
                      onCheckedChange={(checked) => handleColumnaChange(columna, checked as boolean)}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label 
                      htmlFor={columna} 
                      className="capitalize font-medium text-slate-700 cursor-pointer flex-1"
                    >
                      {columna.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resultados del Reporte */}
        <div className="xl:col-span-2">
          <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className={`p-2 bg-gradient-to-br from-${currentConfig.color}-500 to-${currentConfig.color}-600 rounded-xl`}>
                  <currentConfig.icon className="w-5 h-5 text-white" />
                </div>
                Resultados del Reporte - {currentConfig.label}
              </CardTitle>
              {reporteData.length > 0 && (
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <Badge className="bg-green-100 text-green-700">{reporteData.length} registros encontrados</Badge>
                  <span>Filtrado por: {filtros.tipoReporte}</span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-slate-800">Generando reporte...</h3>
                    <p className="text-slate-600">Procesando datos y aplicando filtros</p>
                  </div>
                </div>
              ) : reporteData.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200">
                        {columnas.fecha && <TableHead className="font-semibold text-slate-700">Fecha</TableHead>}
                        {columnas.cliente && <TableHead className="font-semibold text-slate-700">Cliente</TableHead>}
                        {columnas.casillero && <TableHead className="font-semibold text-slate-700">Casillero</TableHead>}
                        {columnas.descripcion && <TableHead className="font-semibold text-slate-700">Descripción</TableHead>}
                        {columnas.peso && <TableHead className="font-semibold text-slate-700">Peso</TableHead>}
                        {columnas.valor && <TableHead className="font-semibold text-slate-700">Valor</TableHead>}
                        {columnas.estado && <TableHead className="font-semibold text-slate-700">Estado</TableHead>}
                        {columnas.factura && <TableHead className="font-semibold text-slate-700">Factura</TableHead>}
                        {columnas.metodoPago && <TableHead className="font-semibold text-slate-700">Método Pago</TableHead>}
                        {columnas.sucursal && <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reporteData.map((item, index) => (
                        <TableRow key={index} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                          {columnas.fecha && <TableCell className="font-medium">{item.fecha}</TableCell>}
                          {columnas.cliente && <TableCell className="font-semibold text-slate-800">{item.cliente}</TableCell>}
                          {columnas.casillero && (
                            <TableCell>
                              <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 font-medium">
                                {item.casillero}
                              </Badge>
                            </TableCell>
                          )}
                          {columnas.descripcion && <TableCell>{item.descripcion}</TableCell>}
                          {columnas.peso && <TableCell className="font-medium">{item.peso}</TableCell>}
                          {columnas.valor && <TableCell className="font-semibold text-green-600">{item.valor}</TableCell>}
                          {columnas.estado && (
                            <TableCell>
                              <Badge className={`${item.estado === "Entregado" ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-yellow-500 to-orange-500'} text-white shadow-lg`}>
                                {item.estado}
                              </Badge>
                            </TableCell>
                          )}
                          {columnas.factura && <TableCell className="font-mono text-sm">{item.factura}</TableCell>}
                          {columnas.metodoPago && (
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                                {item.metodoPago}
                              </Badge>
                            </TableCell>
                          )}
                          {columnas.sucursal && <TableCell>{item.sucursal}</TableCell>}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto">
                    <Search className="w-10 h-10 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-slate-700">No hay datos para mostrar</h3>
                    <p className="text-slate-500">Configura los filtros y genera un reporte para ver los resultados</p>
                  </div>
                  <Button 
                    onClick={handleGenerarReporte}
                    variant="outline"
                    className="mt-4 border-slate-200 hover:bg-slate-50"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Generar Reporte
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}