"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Target, Users, Building, DollarSign } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

export default function ManagePlans() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('superadmin')
  const router = useRouter()
  const pathname = usePathname()

  const [plans, setPlans] = useState([
    {
      id: 1,
      nombre: "Básico",
      descripcion: "Plan ideal para pequeñas empresas",
      precio: 29.99,
      sucursalesMax: 1,
      usuariosMax: 5,
      paquetesMax: 100,
      caracteristicas: ["Gestión básica de paquetes", "1 sucursal", "5 usuarios", "Soporte por email"],
      activo: true,
      clientesActivos: 15
    },
    {
      id: 2,
      nombre: "Premium",
      descripcion: "Plan para empresas en crecimiento",
      precio: 79.99,
      sucursalesMax: 5,
      usuariosMax: 25,
      paquetesMax: 500,
      caracteristicas: ["Gestión avanzada", "5 sucursales", "25 usuarios", "Reportes detallados", "Soporte prioritario"],
      activo: true,
      clientesActivos: 8
    },
    {
      id: 3,
      nombre: "Empresarial",
      descripcion: "Plan para grandes corporaciones",
      precio: 199.99,
      sucursalesMax: 999,
      usuariosMax: 999,
      paquetesMax: 9999,
      caracteristicas: ["Gestión completa", "Sucursales ilimitadas", "Usuarios ilimitados", "API personalizada", "Soporte 24/7"],
      activo: true,
      clientesActivos: 3
    },
    {
      id: 4,
      nombre: "Demo",
      descripcion: "Plan de prueba gratuito",
      precio: 0,
      sucursalesMax: 1,
      usuariosMax: 3,
      paquetesMax: 10,
      caracteristicas: ["Funciones básicas", "1 sucursal", "3 usuarios", "10 paquetes/mes"],
      activo: false,
      clientesActivos: 12
    }
  ])

  const [isNewPlanDialogOpen, setIsNewPlanDialogOpen] = useState(false)
  const [isEditPlanDialogOpen, setIsEditPlanDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  const [newPlanForm, setNewPlanForm] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    sucursalesMax: 1,
    usuariosMax: 1,
    paquetesMax: 10,
    caracteristicas: "",
    activo: true
  })

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const storedUserType = localStorage.getItem("userType") as 'superadmin' | 'admin' | 'client'
    
    if (!auth || storedUserType !== 'superadmin') {
      router.push("/")
    } else {
      setIsAuthenticated(true)
      setUserType(storedUserType)
    }
  }, [router])

  const handleCreatePlan = () => {
    const caracteristicasArray = newPlanForm.caracteristicas.split('\n').filter(c => c.trim())
    const newPlan = {
      id: Date.now(),
      ...newPlanForm,
      caracteristicas: caracteristicasArray,
      clientesActivos: 0
    }
    setPlans(prev => [...prev, newPlan])
    setIsNewPlanDialogOpen(false)
    setNewPlanForm({
      nombre: "",
      descripcion: "",
      precio: 0,
      sucursalesMax: 1,
      usuariosMax: 1,
      paquetesMax: 10,
      caracteristicas: "",
      activo: true
    })
    toast({
      title: "Plan Creado",
      description: "El nuevo plan ha sido creado exitosamente.",
    })
  }

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan)
    setIsEditPlanDialogOpen(true)
  }

  const handleDeletePlan = (planId: number) => {
    setPlans(prev => prev.filter(plan => plan.id !== planId))
    toast({
      title: "Plan Eliminado",
      description: "El plan ha sido eliminado exitosamente.",
      variant: "destructive",
    })
  }

  const handleTogglePlanStatus = (planId: number) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId ? { ...plan, activo: !plan.activo } : plan
    ))
  }

  const totalPlanes = plans.length
  const planesActivos = plans.filter(p => p.activo).length
  const totalClientes = plans.reduce((sum, p) => sum + p.clientesActivos, 0)
  const ingresosMensuales = plans.reduce((sum, p) => sum + (p.precio * p.clientesActivos), 0)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25 animate-pulse">
              <Target className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Cargando...</h3>
            <p className="text-slate-500">Gestión de planes</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar userType={userType} currentPath={pathname} />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm lg:ml-0 ml-16">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Gestionar Planes
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Administración de planes de suscripción y precios
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Planes</p>
                    <p className="text-3xl font-bold text-blue-600">{totalPlanes}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Planes Activos</p>
                    <p className="text-3xl font-bold text-green-600">{planesActivos}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Clientes</p>
                    <p className="text-3xl font-bold text-purple-600">{totalClientes}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Ingresos Mensuales</p>
                    <p className="text-3xl font-bold text-orange-600">${ingresosMensuales.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plans Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-slate-800">Planes de Suscripción</CardTitle>
                <Dialog open={isNewPlanDialogOpen} onOpenChange={setIsNewPlanDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Nuevo Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Crear Nuevo Plan</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="nombre">Nombre del Plan</Label>
                          <Input
                            id="nombre"
                            value={newPlanForm.nombre}
                            onChange={(e) => setNewPlanForm(prev => ({ ...prev, nombre: e.target.value }))}
                            placeholder="Ej: Premium"
                          />
                        </div>
                        <div>
                          <Label htmlFor="precio">Precio Mensual ($)</Label>
                          <Input
                            id="precio"
                            type="number"
                            step="0.01"
                            value={newPlanForm.precio}
                            onChange={(e) => setNewPlanForm(prev => ({ ...prev, precio: parseFloat(e.target.value) }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Textarea
                          id="descripcion"
                          value={newPlanForm.descripcion}
                          onChange={(e) => setNewPlanForm(prev => ({ ...prev, descripcion: e.target.value }))}
                          placeholder="Descripción del plan"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="sucursales">Sucursales Máx.</Label>
                          <Input
                            id="sucursales"
                            type="number"
                            value={newPlanForm.sucursalesMax}
                            onChange={(e) => setNewPlanForm(prev => ({ ...prev, sucursalesMax: parseInt(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="usuarios">Usuarios Máx.</Label>
                          <Input
                            id="usuarios"
                            type="number"
                            value={newPlanForm.usuariosMax}
                            onChange={(e) => setNewPlanForm(prev => ({ ...prev, usuariosMax: parseInt(e.target.value) }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="paquetes">Paquetes Máx.</Label>
                          <Input
                            id="paquetes"
                            type="number"
                            value={newPlanForm.paquetesMax}
                            onChange={(e) => setNewPlanForm(prev => ({ ...prev, paquetesMax: parseInt(e.target.value) }))}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="caracteristicas">Características (una por línea)</Label>
                        <Textarea
                          id="caracteristicas"
                          value={newPlanForm.caracteristicas}
                          onChange={(e) => setNewPlanForm(prev => ({ ...prev, caracteristicas: e.target.value }))}
                          placeholder="Gestión básica de paquetes&#10;Soporte por email&#10;..."
                          rows={4}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="activo"
                          checked={newPlanForm.activo}
                          onCheckedChange={(checked) => setNewPlanForm(prev => ({ ...prev, activo: checked }))}
                        />
                        <Label htmlFor="activo">Plan Activo</Label>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsNewPlanDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleCreatePlan}>Crear Plan</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Plan</TableHead>
                      <TableHead className="font-semibold text-slate-700">Precio</TableHead>
                      <TableHead className="font-semibold text-slate-700">Límites</TableHead>
                      <TableHead className="font-semibold text-slate-700">Clientes Activos</TableHead>
                      <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Ingresos</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plans.map((plan) => (
                      <TableRow key={plan.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell>
                          <div>
                            <div className="font-semibold text-slate-800">{plan.nombre}</div>
                            <div className="text-sm text-slate-500">{plan.descripcion}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-lg text-green-600">
                          ${plan.precio.toFixed(2)}/mes
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div>Sucursales: {plan.sucursalesMax === 999 ? "Ilimitadas" : plan.sucursalesMax}</div>
                            <div>Usuarios: {plan.usuariosMax === 999 ? "Ilimitados" : plan.usuariosMax}</div>
                            <div>Paquetes: {plan.paquetesMax === 9999 ? "Ilimitados" : plan.paquetesMax}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-blue-600">{plan.clientesActivos}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={plan.activo}
                              onCheckedChange={() => handleTogglePlanStatus(plan.id)}
                            />
                            <Badge className={`${
                              plan.activo 
                                ? "bg-gradient-to-r from-green-500 to-green-600" 
                                : "bg-gradient-to-r from-gray-500 to-gray-600"
                            } text-white shadow-lg`}>
                              {plan.activo ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-purple-600">
                          ${(plan.precio * plan.clientesActivos).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => handleEditPlan(plan)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleDeletePlan(plan.id)}
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
      </div>
    </div>
  )
}