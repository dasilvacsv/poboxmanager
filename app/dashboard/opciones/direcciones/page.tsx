"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, MapPin, DollarSign, Building2 } from "lucide-react"

const mockDirecciones = [
  {
    id: 1,
    nombre: "Miami Warehouse",
    direccion1: "1970 NW 82ND AVE",
    direccion2: "Suite 101",
    ciudad: "Miami",
    estado: "Florida",
    pais: "Estados Unidos",
    codigoPostal: "33126",
    tarifa: 2.5,
    membresias: ["Básica", "Premium"],
    activa: true,
  },
  {
    id: 2,
    nombre: "New York Hub",
    direccion1: "123 Broadway",
    direccion2: "",
    ciudad: "New York",
    estado: "New York",
    pais: "Estados Unidos",
    codigoPostal: "10001",
    tarifa: 3.0,
    membresias: ["Premium"],
    activa: true,
  },
]

const mockMembresias = ["Básica", "Premium", "VIP"]

export default function DireccionesPage() {
  const [direcciones, setDirecciones] = useState(mockDirecciones)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDireccion, setEditingDireccion] = useState<any>(null)

  const [formData, setFormData] = useState({
    nombre: "",
    direccion1: "",
    direccion2: "",
    ciudad: "",
    estado: "",
    pais: "Estados Unidos",
    codigoPostal: "",
    tarifa: 0,
    membresias: [] as string[],
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleMembresiaToggle = (membresia: string) => {
    setFormData((prev) => ({
      ...prev,
      membresias: prev.membresias.includes(membresia)
        ? prev.membresias.filter((m) => m !== membresia)
        : [...prev.membresias, membresia],
    }))
  }

  const handleSave = () => {
    console.log("Guardando dirección:", formData)
    setIsDialogOpen(false)
    setFormData({
      nombre: "",
      direccion1: "",
      direccion2: "",
      ciudad: "",
      estado: "",
      pais: "Estados Unidos",
      codigoPostal: "",
      tarifa: 0,
      membresias: [],
    })
  }

  const openEditDialog = (direccion: any) => {
    setEditingDireccion(direccion)
    setFormData({
      nombre: direccion.nombre,
      direccion1: direccion.direccion1,
      direccion2: direccion.direccion2,
      ciudad: direccion.ciudad,
      estado: direccion.estado,
      pais: direccion.pais,
      codigoPostal: direccion.codigoPostal,
      tarifa: direccion.tarifa,
      membresias: direccion.membresias,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Administración de Direcciones
              </h1>
              <p className="text-lg text-gray-600 mt-2">Gestiona las direcciones disponibles para tus clientes</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingDireccion(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Dirección
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDireccion ? "Editar Dirección" : "Nueva Dirección"}</DialogTitle>
              </DialogHeader>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="nombre">Nombre de la Dirección</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      placeholder="Ej: Miami Warehouse"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="direccion1">Dirección 1</Label>
                    <Input
                      id="direccion1"
                      value={formData.direccion1}
                      onChange={(e) => handleInputChange("direccion1", e.target.value)}
                      placeholder="1970 NW 82ND AVE"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="direccion2">Dirección 2 (Opcional)</Label>
                    <Input
                      id="direccion2"
                      value={formData.direccion2}
                      onChange={(e) => handleInputChange("direccion2", e.target.value)}
                      placeholder="Suite, Apartamento, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Input
                      id="ciudad"
                      value={formData.ciudad}
                      onChange={(e) => handleInputChange("ciudad", e.target.value)}
                      placeholder="Miami"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Input
                      id="estado"
                      value={formData.estado}
                      onChange={(e) => handleInputChange("estado", e.target.value)}
                      placeholder="Florida"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pais">País</Label>
                    <Select value={formData.pais} onValueChange={(value) => handleInputChange("pais", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                        <SelectItem value="Canadá">Canadá</SelectItem>
                        <SelectItem value="México">México</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codigoPostal">Código Postal</Label>
                    <Input
                      id="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={(e) => handleInputChange("codigoPostal", e.target.value)}
                      placeholder="33126"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tarifa">Tarifa por Libra ($)</Label>
                    <Input
                      id="tarifa"
                      type="number"
                      step="0.01"
                      value={formData.tarifa}
                      onChange={(e) => handleInputChange("tarifa", Number(e.target.value))}
                      placeholder="2.50"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <Label>Membresías Asignadas</Label>
                    <div className="flex flex-wrap gap-2">
                      {mockMembresias.map((membresia) => (
                        <Button
                          key={membresia}
                          variant={formData.membresias.includes(membresia) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleMembresiaToggle(membresia)}
                        >
                          {membresia}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave}>Guardar Dirección</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Direcciones</p>
                  <p className="text-3xl font-bold text-gray-900">{direcciones.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Direcciones Activas</p>
                  <p className="text-3xl font-bold text-gray-900">{direcciones.filter((d) => d.activa).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tarifa Promedio</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${(direcciones.reduce((sum, d) => sum + d.tarifa, 0) / direcciones.length).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              Lista de Direcciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Dirección Completa</TableHead>
                  <TableHead>Tarifa</TableHead>
                  <TableHead>Membresías</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {direcciones.map((direccion) => (
                  <TableRow key={direccion.id}>
                    <TableCell className="font-medium">{direccion.nombre}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{direccion.direccion1}</div>
                        {direccion.direccion2 && <div className="text-gray-600">{direccion.direccion2}</div>}
                        <div className="text-gray-500">
                          {direccion.ciudad}, {direccion.estado} {direccion.codigoPostal}
                        </div>
                        <div className="text-gray-500">{direccion.pais}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-green-600">${direccion.tarifa.toFixed(2)}/lb</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {direccion.membresias.map((membresia) => (
                          <Badge key={membresia} variant="secondary" className="text-xs">
                            {membresia}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={direccion.activa ? "default" : "secondary"}>
                        {direccion.activa ? "Activa" : "Inactiva"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(direccion)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}