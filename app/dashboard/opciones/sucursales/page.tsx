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
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, MapPin, Building2, Clock, DollarSign } from "lucide-react"

const mockSucursales = [
  {
    id: 1,
    nombre: "Sucursal Miami Central",
    direccion: "1970 NW 82ND AVE",
    ciudad: "Miami",
    estado: "Florida",
    codigoPostal: "33126",
    telefono: "+1-305-123-4567",
    email: "miami@poboxmanager.com",
    horario: "8:00 AM - 6:00 PM",
    activa: true,
    codigoCasillero: "MIA",
    costoAdicional: 0,
  },
  {
    id: 2,
    nombre: "Sucursal Orlando",
    direccion: "123 International Dr",
    ciudad: "Orlando",
    estado: "Florida",
    codigoPostal: "32819",
    telefono: "+1-407-123-4567",
    email: "orlando@poboxmanager.com",
    horario: "9:00 AM - 5:00 PM",
    activa: true,
    codigoCasillero: "ORL",
    costoAdicional: 15.0,
  },
]

export default function SucursalesPage() {
  const [sucursales, setSucursales] = useState(mockSucursales)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSucursal, setEditingSucursal] = useState<any>(null)

  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    telefono: "",
    email: "",
    horario: "",
    terminosCondiciones: "",
    codigoCasillero: "",
    costoAdicional: 0,
  })

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Guardando sucursal:", formData)
    setIsDialogOpen(false)
    setFormData({
      nombre: "",
      direccion: "",
      ciudad: "",
      estado: "",
      codigoPostal: "",
      telefono: "",
      email: "",
      horario: "",
      terminosCondiciones: "",
      codigoCasillero: "",
      costoAdicional: 0,
    })
  }

  const toggleSucursal = (id: number) => {
    setSucursales((prev) => prev.map((s) => (s.id === id ? { ...s, activa: !s.activa } : s)))
  }

  const activeSucursales = sucursales.filter(s => s.activa).length
  const averageCost = sucursales.reduce((sum, s) => sum + s.costoAdicional, 0) / sucursales.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Gestión de Sucursales
              </h1>
              <p className="text-lg text-gray-600 mt-2">Administra las sucursales de tu empresa</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Sucursal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingSucursal ? "Editar Sucursal" : "Nueva Sucursal"}</DialogTitle>
              </DialogHeader>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="nombre">Nombre de la Sucursal</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="codigoCasillero">Código de Casillero</Label>
                    <Input
                      id="codigoCasillero"
                      value={formData.codigoCasillero}
                      onChange={(e) => handleInputChange("codigoCasillero", e.target.value)}
                      placeholder="Ej: MIA, NYC, LAX"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="direccion">Dirección</Label>
                    <Input
                      id="direccion"
                      value={formData.direccion}
                      onChange={(e) => handleInputChange("direccion", e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="ciudad">Ciudad</Label>
                    <Input
                      id="ciudad"
                      value={formData.ciudad}
                      onChange={(e) => handleInputChange("ciudad", e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="estado">Estado</Label>
                    <Input
                      id="estado"
                      value={formData.estado}
                      onChange={(e) => handleInputChange("estado", e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="codigoPostal">Código Postal</Label>
                    <Input
                      id="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={(e) => handleInputChange("codigoPostal", e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="horario">Horario de Atención</Label>
                    <Input
                      id="horario"
                      value={formData.horario}
                      onChange={(e) => handleInputChange("horario", e.target.value)}
                      placeholder="Ej: 8:00 AM - 6:00 PM"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="costoAdicional">Costo Adicional ($)</Label>
                    <Input
                      id="costoAdicional"
                      type="number"
                      value={formData.costoAdicional}
                      onChange={(e) => handleInputChange("costoAdicional", Number(e.target.value))}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <Label htmlFor="terminosCondiciones">Términos y Condiciones Específicos</Label>
                    <Textarea
                      id="terminosCondiciones"
                      value={formData.terminosCondiciones}
                      onChange={(e) => handleInputChange("terminosCondiciones", e.target.value)}
                      rows={6}
                      placeholder="Términos específicos para esta sucursal..."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave}>Guardar Sucursal</Button>
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
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sucursales</p>
                  <p className="text-3xl font-bold text-gray-900">{sucursales.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Sucursales Activas</p>
                  <p className="text-3xl font-bold text-gray-900">{activeSucursales}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Costo Promedio</p>
                  <p className="text-3xl font-bold text-gray-900">${averageCost.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              Lista de Sucursales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Horario</TableHead>
                  <TableHead>Costo Adicional</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sucursales.map((sucursal) => (
                  <TableRow key={sucursal.id}>
                    <TableCell className="font-medium">{sucursal.nombre}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {sucursal.codigoCasillero}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{sucursal.direccion}</div>
                        <div className="text-gray-500">
                          {sucursal.ciudad}, {sucursal.estado} {sucursal.codigoPostal}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {sucursal.telefono}
                        </div>
                        <div className="text-gray-500">{sucursal.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {sucursal.horario}
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-green-600">
                      ${sucursal.costoAdicional.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Switch 
                          checked={sucursal.activa} 
                          onCheckedChange={() => toggleSucursal(sucursal.id)} 
                        />
                        <Badge variant={sucursal.activa ? "default" : "secondary"}>
                          {sucursal.activa ? "Activa" : "Inactiva"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
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