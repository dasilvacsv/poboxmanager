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
import { Plus, Edit, Trash2, Mail, Send, Eye, FileText, Zap } from "lucide-react"

const mockTemplates = [
  {
    id: 1,
    nombre: "Bienvenida",
    asunto: "¡Bienvenido a PoboxManager!",
    tipo: "Automático",
    activo: true,
    ultimoUso: "2024-01-15",
    usos: 245,
  },
  {
    id: 2,
    nombre: "Paquete Recibido",
    asunto: "Nuevo paquete en tu casillero",
    tipo: "Automático",
    activo: true,
    ultimoUso: "2024-01-14",
    usos: 1832,
  },
  {
    id: 3,
    nombre: "Promoción Mensual",
    asunto: "Ofertas especiales este mes",
    tipo: "Manual",
    activo: false,
    ultimoUso: "2024-01-10",
    usos: 67,
  },
]

export default function EmailTemplatePage() {
  const [templates, setTemplates] = useState(mockTemplates)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)

  const [formData, setFormData] = useState({
    nombre: "",
    asunto: "",
    contenido: "",
    tipo: "Manual",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Guardando template:", formData)
    setIsDialogOpen(false)
    setFormData({
      nombre: "",
      asunto: "",
      contenido: "",
      tipo: "Manual",
    })
  }

  const openEditDialog = (template: any) => {
    setEditingTemplate(template)
    setFormData({
      nombre: template.nombre,
      asunto: template.asunto,
      contenido: "Contenido del template...",
      tipo: template.tipo,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Templates de Email
              </h1>
              <p className="text-lg text-gray-600 mt-2">Gestiona las plantillas de correo electrónico</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingTemplate(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTemplate ? "Editar Template" : "Nuevo Template"}</DialogTitle>
              </DialogHeader>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="nombre">Nombre del Template</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      placeholder="Ej: Bienvenida"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="tipo">Tipo</Label>
                    <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manual">Manual</SelectItem>
                        <SelectItem value="Automático">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="asunto">Asunto</Label>
                  <Input
                    id="asunto"
                    value={formData.asunto}
                    onChange={(e) => handleInputChange("asunto", e.target.value)}
                    placeholder="Asunto del email"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="contenido">Contenido</Label>
                  <Textarea
                    id="contenido"
                    value={formData.contenido}
                    onChange={(e) => handleInputChange("contenido", e.target.value)}
                    rows={12}
                    placeholder="Contenido del email..."
                  />
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Variables disponibles:</h4>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge variant="outline">{"{nombre}"}</Badge>
                    <Badge variant="outline">{"{casillero}"}</Badge>
                    <Badge variant="outline">{"{fecha}"}</Badge>
                    <Badge variant="outline">{"{empresa}"}</Badge>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave}>Guardar Template</Button>
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
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Templates</p>
                  <p className="text-3xl font-bold text-gray-900">{templates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Templates Activos</p>
                  <p className="text-3xl font-bold text-gray-900">{templates.filter((t) => t.activo).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Emails Enviados</p>
                  <p className="text-3xl font-bold text-gray-900">{templates.reduce((sum, t) => sum + t.usos, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <Mail className="w-5 h-5 text-white" />
              </div>
              Lista de Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Asunto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Usos</TableHead>
                  <TableHead>Último Uso</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.nombre}</TableCell>
                    <TableCell className="max-w-xs truncate">{template.asunto}</TableCell>
                    <TableCell>
                      <Badge variant={template.tipo === "Automático" ? "default" : "secondary"}>
                        {template.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={template.activo ? "default" : "destructive"}>
                        {template.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-blue-600">{template.usos.toLocaleString()}</TableCell>
                    <TableCell>{template.ultimoUso}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(template)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Send className="w-4 h-4" />
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