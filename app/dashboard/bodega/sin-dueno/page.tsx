"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, AlertTriangle, Package, Calendar, MapPin, Weight, DollarSign, Clock, FileText } from "lucide-react"

const mockPaquetesSinDueno = [
  {
    id: 1,
    tracking: "TRK999888777",
    descripcion: "Paquete electrónicos sin identificar",
    peso: "3.2 lbs",
    dimensiones: "12x8x6 in",
    fechaLlegada: "2024-01-10",
    diasEnBodega: 6,
    estado: "Sin identificar",
    observaciones: "Etiqueta dañada, no se puede leer destinatario",
    valorEstimado: "$200.00",
    ubicacionBodega: "A-15",
  },
  {
    id: 2,
    tracking: "TRK888777666",
    descripcion: "Caja de ropa",
    peso: "2.1 lbs",
    dimensiones: "10x10x4 in",
    fechaLlegada: "2024-01-08",
    diasEnBodega: 8,
    estado: "Investigando",
    observaciones: "Posible cliente: María G. - verificando datos",
    valorEstimado: "$85.00",
    ubicacionBodega: "B-22",
  },
  {
    id: 3,
    tracking: "TRK777666555",
    descripcion: "Documentos importantes",
    peso: "0.5 lbs",
    dimensiones: "9x12x1 in",
    fechaLlegada: "2024-01-05",
    diasEnBodega: 11,
    estado: "Para devolución",
    observaciones: "Dirección incorrecta, preparar para devolución al remitente",
    valorEstimado: "$0.00",
    ubicacionBodega: "C-08",
  },
]

export default function RegistroPaquetesSinDuenoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [paquetes, setPaquetes] = useState(mockPaquetesSinDueno)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPaquete, setEditingPaquete] = useState<any>(null)

  const [formData, setFormData] = useState({
    tracking: "",
    descripcion: "",
    peso: "",
    dimensiones: "",
    valorEstimado: "",
    ubicacionBodega: "",
    observaciones: "",
    estado: "Sin identificar",
  })

  const filteredPaquetes = paquetes.filter(
    (paquete) =>
      paquete.tracking.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paquete.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Guardando paquete sin dueño:", formData)
    setIsDialogOpen(false)
    setFormData({
      tracking: "",
      descripcion: "",
      peso: "",
      dimensiones: "",
      valorEstimado: "",
      ubicacionBodega: "",
      observaciones: "",
      estado: "Sin identificar",
    })
  }

  const openEditDialog = (paquete: any) => {
    setEditingPaquete(paquete)
    setFormData({
      tracking: paquete.tracking,
      descripcion: paquete.descripcion,
      peso: paquete.peso,
      dimensiones: paquete.dimensiones,
      valorEstimado: paquete.valorEstimado,
      ubicacionBodega: paquete.ubicacionBodega,
      observaciones: paquete.observaciones,
      estado: paquete.estado,
    })
    setIsDialogOpen(true)
  }

  const getEstadoBadge = (estado: string) => {
    const variants = {
      "Sin identificar": "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25",
      "Investigando": "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/25",
      "Para devolución": "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25",
      "Resuelto": "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25"
    }
    return variants[estado as keyof typeof variants] || variants["Sin identificar"]
  }

  const getPrioridadColor = (dias: number) => {
    if (dias >= 15) return "text-red-600 font-bold"
    if (dias >= 7) return "text-yellow-600 font-semibold"
    return "text-green-600 font-medium"
  }

  const resetDialog = () => {
    setEditingPaquete(null)
    setFormData({
      tracking: "",
      descripcion: "",
      peso: "",
      dimensiones: "",
      valorEstimado: "",
      ubicacionBodega: "",
      observaciones: "",
      estado: "Sin identificar",
    })
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Registro Paquetes Sin Dueño
          </h1>
          <p className="text-slate-600 text-lg">Gestiona y rastrea paquetes sin destinatario identificado</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="w-4 h-4" />
            <span>Sistema de gestión de paquetes huérfanos</span>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetDialog}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group"
            >
              <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Registrar Paquete
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Package className="w-5 h-5 text-white" />
                </div>
                {editingPaquete ? "Editar Paquete" : "Registrar Nuevo Paquete Sin Dueño"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-3">
                <Label htmlFor="tracking" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Número de Tracking
                </Label>
                <Input
                  id="tracking"
                  value={formData.tracking}
                  onChange={(e) => handleInputChange("tracking", e.target.value)}
                  placeholder="TRK123456789"
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="estado" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Estado
                </Label>
                <Select value={formData.estado} onValueChange={(value) => handleInputChange("estado", value)}>
                  <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sin identificar">Sin identificar</SelectItem>
                    <SelectItem value="Investigando">Investigando</SelectItem>
                    <SelectItem value="Para devolución">Para devolución</SelectItem>
                    <SelectItem value="Resuelto">Resuelto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-3">
                <Label htmlFor="descripcion" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Descripción del Paquete
                </Label>
                <Input
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  placeholder="Descripción detallada del contenido"
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="peso" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Weight className="w-4 h-4" />
                  Peso
                </Label>
                <Input
                  id="peso"
                  value={formData.peso}
                  onChange={(e) => handleInputChange("peso", e.target.value)}
                  placeholder="2.5 lbs"
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="dimensiones" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Dimensiones
                </Label>
                <Input
                  id="dimensiones"
                  value={formData.dimensiones}
                  onChange={(e) => handleInputChange("dimensiones", e.target.value)}
                  placeholder="12x8x6 in"
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="valorEstimado" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Valor Estimado
                </Label>
                <Input
                  id="valorEstimado"
                  value={formData.valorEstimado}
                  onChange={(e) => handleInputChange("valorEstimado", e.target.value)}
                  placeholder="$100.00"
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="ubicacionBodega" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Ubicación en Bodega
                </Label>
                <Input
                  id="ubicacionBodega"
                  value={formData.ubicacionBodega}
                  onChange={(e) => handleInputChange("ubicacionBodega", e.target.value)}
                  placeholder="A-15"
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                />
              </div>
              <div className="md:col-span-2 space-y-3">
                <Label htmlFor="observaciones" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Observaciones
                </Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => handleInputChange("observaciones", e.target.value)}
                  rows={4}
                  placeholder="Detalles adicionales, posibles pistas sobre el destinatario, etc."
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-slate-200">
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="border-slate-200 hover:bg-slate-50 rounded-xl"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                Guardar Paquete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: AlertTriangle, label: "Total Sin Dueño", value: paquetes.length, color: "red", gradient: "from-red-500 to-red-600" },
          { icon: Package, label: "Investigando", value: paquetes.filter((p) => p.estado === "Investigando").length, color: "yellow", gradient: "from-yellow-500 to-orange-500" },
          { icon: Calendar, label: "Más de 7 días", value: paquetes.filter((p) => p.diasEnBodega > 7).length, color: "orange", gradient: "from-orange-500 to-orange-600" },
          { icon: Clock, label: "Críticos (+15 días)", value: paquetes.filter((p) => p.diasEnBodega >= 15).length, color: "red", gradient: "from-red-600 to-red-700" },
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

      {/* Main Table */}
      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Package className="w-5 h-5 text-white" />
              </div>
              Lista de Paquetes Sin Dueño
            </CardTitle>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar por tracking o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Tracking</TableHead>
                  <TableHead className="font-semibold text-slate-700">Descripción</TableHead>
                  <TableHead className="font-semibold text-slate-700">Peso/Dimensiones</TableHead>
                  <TableHead className="font-semibold text-slate-700">Fecha Llegada</TableHead>
                  <TableHead className="font-semibold text-slate-700">Días en Bodega</TableHead>
                  <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                  <TableHead className="font-semibold text-slate-700">Ubicación</TableHead>
                  <TableHead className="font-semibold text-slate-700">Valor Est.</TableHead>
                  <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPaquetes.map((paquete) => (
                  <TableRow key={paquete.id} className="hover:bg-slate-50/50 transition-colors border-slate-100 group">
                    <TableCell className="font-mono text-sm font-medium text-slate-800">{paquete.tracking}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-slate-800">{paquete.descripcion}</div>
                        {paquete.observaciones && (
                          <div className="text-xs text-slate-500 bg-slate-100 rounded-lg px-2 py-1 max-w-xs truncate">
                            {paquete.observaciones}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1">
                          <Weight className="w-3 h-3 text-slate-400" />
                          <span className="font-medium">{paquete.peso}</span>
                        </div>
                        <div className="text-slate-500">{paquete.dimensiones}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{paquete.fechaLlegada}</TableCell>
                    <TableCell>
                      <span className={`font-semibold flex items-center gap-2 ${getPrioridadColor(paquete.diasEnBodega)}`}>
                        <Clock className="w-4 h-4" />
                        {paquete.diasEnBodega} días
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getEstadoBadge(paquete.estado)} font-medium px-3 py-1`}>
                        {paquete.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {paquete.ubicacionBodega}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-800">{paquete.valorEstimado}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openEditDialog(paquete)}
                          className="hover:bg-blue-50 hover:text-blue-600 rounded-xl"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="hover:bg-red-50 hover:text-red-600 rounded-xl"
                        >
                          <Trash2 className="w-4 h-4" />
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
  )
}