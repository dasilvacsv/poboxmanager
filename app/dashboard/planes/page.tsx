"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Target, DollarSign, Package, Plane, Ship } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const mockPlanes = [
  {
    id: 1,
    nombre: "Plan Regular",
    descripcion: "Plan estándar para clientes individuales",
    precioAereo: 2.5,
    precioMaritimo: 1.8,
    activo: true,
    clientesAsignados: 45,
    sucursales: ["Miami Central", "Orlando"],
  },
  {
    id: 2,
    nombre: "Plan Emprendedor",
    descripcion: "Plan especial para pequeños negocios",
    precioAereo: 2.2,
    precioMaritimo: 1.5,
    activo: true,
    clientesAsignados: 23,
    sucursales: ["Miami Central"],
  },
  {
    id: 3,
    nombre: "Plan Marítimo Premium",
    descripcion: "Plan optimizado para envíos marítimos",
    precioAereo: 3.0,
    precioMaritimo: 1.2,
    activo: true,
    clientesAsignados: 12,
    sucursales: ["Miami Central", "Orlando", "Tampa"],
  },
]

export default function PlanesPage() {
  const [planes, setPlanes] = useState(mockPlanes)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<any>(null)

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precioAereo: 0,
    precioMaritimo: 0,
    activo: true,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    if (editingPlan) {
      setPlanes((prev) =>
        prev.map((plan) =>
          plan.id === editingPlan.id
            ? {
                ...plan,
                ...formData,
              }
            : plan,
        ),
      )
      toast({
        title: "Plan actualizado",
        description: "El plan ha sido actualizado exitosamente.",
      })
    } else {
      const newPlan = {
        id: Date.now(),
        ...formData,
        clientesAsignados: 0,
        sucursales: [],
      }
      setPlanes((prev) => [...prev, newPlan])
      toast({
        title: "Plan creado",
        description: "El nuevo plan ha sido creado exitosamente.",
      })
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      precioAereo: 0,
      precioMaritimo: 0,
      activo: true,
    })
    setEditingPlan(null)
  }

  const openEditDialog = (plan: any) => {
    setEditingPlan(plan)
    setFormData({
      nombre: plan.nombre,
      descripcion: plan.descripcion,
      precioAereo: plan.precioAereo,
      precioMaritimo: plan.precioMaritimo,
      activo: plan.activo,
    })
    setIsDialogOpen(true)
  }

  const togglePlanStatus = (id: number) => {
    setPlanes((prev) =>
      prev.map((plan) => {
        if (plan.id === id) {
          const newStatus = !plan.activo
          toast({
            title: newStatus ? "Plan activado" : "Plan desactivado",
            description: `El plan ${plan.nombre} ha sido ${newStatus ? "activado" : "desactivado"}.`,
          })
          return { ...plan, activo: newStatus }
        }
        return plan
      }),
    )
  }

  const deletePlan = (id: number) => {
    const plan = planes.find((p) => p.id === id)
    if (plan && plan.clientesAsignados > 0) {
      toast({
        title: "No se puede eliminar",
        description: "No puedes eliminar un plan que tiene clientes asignados.",
        variant: "destructive",
      })
      return
    }

    setPlanes((prev) => prev.filter((plan) => plan.id !== id))
    toast({
      title: "Plan eliminado",
      description: "El plan ha sido eliminado exitosamente.",
    })
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Gestión de Planes
          </h1>
          <p className="text-slate-600 text-lg">Administra los planes de precios desacoplados de direcciones</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Target className="w-4 h-4" />
            <span>Sistema flexible de precios por peso aéreo y marítimo</span>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group"
            >
              <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Crear Nuevo Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Target className="w-5 h-5 text-white" />
                </div>
                {editingPlan ? "Editar Plan" : "Crear Nuevo Plan"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="nombre" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Nombre del Plan
                  </Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    placeholder="Ej: Plan Regular"
                    className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="activo" className="text-sm font-semibold text-slate-700">
                    Estado del Plan
                  </Label>
                  <div className="flex items-center space-x-3 pt-2">
                    <Switch
                      id="activo"
                      checked={formData.activo}
                      onCheckedChange={(checked) => handleInputChange("activo", checked)}
                    />
                    <Label htmlFor="activo" className="text-sm">
                      {formData.activo ? "Activo" : "Inactivo"}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="descripcion" className="text-sm font-semibold text-slate-700">
                  Descripción
                </Label>
                <Input
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  placeholder="Descripción del plan"
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="precioAereo" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    Precio Aéreo ($/lb)
                  </Label>
                  <Input
                    id="precioAereo"
                    type="number"
                    step="0.01"
                    value={formData.precioAereo}
                    onChange={(e) => handleInputChange("precioAereo", Number(e.target.value))}
                    placeholder="2.50"
                    className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="precioMaritimo"
                    className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <Ship className="w-4 h-4" />
                    Precio Marítimo ($/lb)
                  </Label>
                  <Input
                    id="precioMaritimo"
                    type="number"
                    step="0.01"
                    value={formData.precioMaritimo}
                    onChange={(e) => handleInputChange("precioMaritimo", Number(e.target.value))}
                    placeholder="1.80"
                    className="border-slate-200 focus:border-green-400 rounded-xl"
                  />
                </div>
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
                {editingPlan ? "Actualizar Plan" : "Crear Plan"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Target,
            label: "Total Planes",
            value: planes.length,
            color: "blue",
            gradient: "from-blue-500 to-blue-600",
          },
          {
            icon: Package,
            label: "Planes Activos",
            value: planes.filter((p) => p.activo).length,
            color: "green",
            gradient: "from-green-500 to-green-600",
          },
          {
            icon: DollarSign,
            label: "Precio Promedio Aéreo",
            value: `$${(planes.reduce((sum, p) => sum + p.precioAereo, 0) / planes.length).toFixed(2)}`,
            color: "purple",
            gradient: "from-purple-500 to-purple-600",
          },
          {
            icon: DollarSign,
            label: "Precio Promedio Marítimo",
            value: `$${(planes.reduce((sum, p) => sum + p.precioMaritimo, 0) / planes.length).toFixed(2)}`,
            color: "orange",
            gradient: "from-orange-500 to-orange-600",
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Target className="w-5 h-5 text-white" />
            </div>
            Lista de Planes de Precios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Plan</TableHead>
                  <TableHead className="font-semibold text-slate-700">Precio Aéreo</TableHead>
                  <TableHead className="font-semibold text-slate-700">Precio Marítimo</TableHead>
                  <TableHead className="font-semibold text-slate-700">Clientes Asignados</TableHead>
                  <TableHead className="font-semibold text-slate-700">Sucursales</TableHead>
                  <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                  <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planes.map((plan) => (
                  <TableRow key={plan.id} className="hover:bg-slate-50/50 transition-colors border-slate-100 group">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-800">{plan.nombre}</div>
                        <div className="text-sm text-slate-500">{plan.descripcion}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-blue-500" />
                        <span className="font-bold text-blue-600">${plan.precioAereo.toFixed(2)}/lb</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Ship className="w-4 h-4 text-green-500" />
                        <span className="font-bold text-green-600">${plan.precioMaritimo.toFixed(2)}/lb</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700 font-medium">
                        {plan.clientesAsignados} clientes
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {plan.sucursales.slice(0, 2).map((sucursal, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-slate-50 border-slate-200 text-slate-700"
                          >
                            {sucursal}
                          </Badge>
                        ))}
                        {plan.sucursales.length > 2 && (
                          <Badge variant="outline" className="text-xs bg-slate-50 border-slate-200 text-slate-700">
                            +{plan.sucursales.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Switch checked={plan.activo} onCheckedChange={() => togglePlanStatus(plan.id)} />
                        <Badge
                          className={`${
                            plan.activo
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : "bg-gradient-to-r from-gray-500 to-gray-600"
                          } text-white shadow-lg font-medium px-3 py-1`}
                        >
                          {plan.activo ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(plan)}
                          className="hover:bg-blue-50 hover:text-blue-600 rounded-xl"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deletePlan(plan.id)}
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
