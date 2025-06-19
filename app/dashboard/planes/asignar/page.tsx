"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Target, MapPin, Users, Package, Save, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const mockSucursales = [
  {
    id: 1,
    nombre: "Miami Central",
    direccion: "1234 Brickell Ave, Miami, FL",
    planActual: "Plan Regular",
    clientesAsignados: 145,
    paquetesMes: 567,
    activa: true,
  },
  {
    id: 2,
    nombre: "Orlando Express",
    direccion: "5678 International Dr, Orlando, FL",
    planActual: "Plan Emprendedor",
    clientesAsignados: 89,
    paquetesMes: 234,
    activa: true,
  },
  {
    id: 3,
    nombre: "Tampa Bay",
    direccion: "9012 Westshore Blvd, Tampa, FL",
    planActual: "Plan Marítimo Premium",
    clientesAsignados: 67,
    paquetesMes: 156,
    activa: false,
  },
]

const mockPlanes = [
  { id: 1, nombre: "Plan Regular", precioAereo: 2.5, precioMaritimo: 1.8 },
  { id: 2, nombre: "Plan Emprendedor", precioAereo: 2.2, precioMaritimo: 1.5 },
  { id: 3, nombre: "Plan Marítimo Premium", precioAereo: 3.0, precioMaritimo: 1.2 },
  { id: 4, nombre: "Plan Corporativo", precioAereo: 2.0, precioMaritimo: 1.0 },
]

export default function AsignarPlanesPage() {
  const [sucursales, setSucursales] = useState(mockSucursales)
  const [cambiosPendientes, setCambiosPendientes] = useState<{ [key: number]: string }>({})

  const handlePlanChange = (sucursalId: number, nuevoPlan: string) => {
    setCambiosPendientes((prev) => ({
      ...prev,
      [sucursalId]: nuevoPlan,
    }))
  }

  const aplicarCambios = () => {
    setSucursales((prev) =>
      prev.map((sucursal) => ({
        ...sucursal,
        planActual: cambiosPendientes[sucursal.id] || sucursal.planActual,
      })),
    )

    const cantidadCambios = Object.keys(cambiosPendientes).length
    setCambiosPendientes({})

    toast({
      title: "Planes actualizados",
      description: `Se han actualizado ${cantidadCambios} asignaciones de planes exitosamente.`,
    })
  }

  const descartarCambios = () => {
    setCambiosPendientes({})
    toast({
      title: "Cambios descartados",
      description: "Se han descartado todos los cambios pendientes.",
    })
  }

  const getPlanColor = (planNombre: string) => {
    switch (planNombre) {
      case "Plan Regular":
        return "bg-blue-50 border-blue-200 text-blue-700"
      case "Plan Emprendedor":
        return "bg-green-50 border-green-200 text-green-700"
      case "Plan Marítimo Premium":
        return "bg-purple-50 border-purple-200 text-purple-700"
      case "Plan Corporativo":
        return "bg-orange-50 border-orange-200 text-orange-700"
      default:
        return "bg-slate-50 border-slate-200 text-slate-700"
    }
  }

  const getPlanDetails = (planNombre: string) => {
    return mockPlanes.find((plan) => plan.nombre === planNombre)
  }

  const hayCambiosPendientes = Object.keys(cambiosPendientes).length > 0

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Asignar Planes a Sucursales
          </h1>
          <p className="text-slate-600 text-lg">Configura planes de precios independientes para cada sucursal</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Target className="w-4 h-4" />
            <span>Cada sucursal puede tener precios diferentes según su plan asignado</span>
          </div>
        </div>

        {hayCambiosPendientes && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={descartarCambios}
              className="bg-white/80 backdrop-blur-sm border-slate-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Descartar Cambios
            </Button>
            <Button
              onClick={aplicarCambios}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Aplicar Cambios ({Object.keys(cambiosPendientes).length})
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Building,
            label: "Total Sucursales",
            value: sucursales.length,
            color: "blue",
            gradient: "from-blue-500 to-blue-600",
          },
          {
            icon: MapPin,
            label: "Sucursales Activas",
            value: sucursales.filter((s) => s.activa).length,
            color: "green",
            gradient: "from-green-500 to-green-600",
          },
          {
            icon: Users,
            label: "Clientes Totales",
            value: sucursales.reduce((sum, s) => sum + s.clientesAsignados, 0),
            color: "purple",
            gradient: "from-purple-500 to-purple-600",
          },
          {
            icon: Package,
            label: "Paquetes Este Mes",
            value: sucursales.reduce((sum, s) => sum + s.paquetesMes, 0),
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
            Asignación de Planes por Sucursal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>
                  <TableHead className="font-semibold text-slate-700">Plan Actual</TableHead>
                  <TableHead className="font-semibold text-slate-700">Nuevo Plan</TableHead>
                  <TableHead className="font-semibold text-slate-700">Precios del Plan</TableHead>
                  <TableHead className="font-semibold text-slate-700">Clientes</TableHead>
                  <TableHead className="font-semibold text-slate-700">Paquetes/Mes</TableHead>
                  <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sucursales.map((sucursal) => {
                  const planSeleccionado = cambiosPendientes[sucursal.id] || sucursal.planActual
                  const planDetails = getPlanDetails(planSeleccionado)
                  const tieneCambios =
                    cambiosPendientes[sucursal.id] && cambiosPendientes[sucursal.id] !== sucursal.planActual

                  return (
                    <TableRow
                      key={sucursal.id}
                      className={`hover:bg-slate-50/50 transition-colors border-slate-100 ${tieneCambios ? "bg-yellow-50/50" : ""}`}
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-semibold text-slate-800 flex items-center gap-2">
                            <Building className="w-4 h-4 text-slate-400" />
                            {sucursal.nombre}
                          </div>
                          <div className="text-sm text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {sucursal.direccion}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getPlanColor(sucursal.planActual)} font-medium`}>
                          {sucursal.planActual}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={planSeleccionado}
                          onValueChange={(value) => handlePlanChange(sucursal.id, value)}
                        >
                          <SelectTrigger
                            className={`w-48 border-slate-200 focus:border-blue-400 rounded-xl ${tieneCambios ? "border-yellow-400 bg-yellow-50" : ""}`}
                          >
                            <SelectValue placeholder="Seleccionar plan" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockPlanes.map((plan) => (
                              <SelectItem key={plan.id} value={plan.nombre}>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-3 h-3 rounded-full ${getPlanColor(plan.nombre).includes("blue") ? "bg-blue-500" : getPlanColor(plan.nombre).includes("green") ? "bg-green-500" : getPlanColor(plan.nombre).includes("purple") ? "bg-purple-500" : "bg-orange-500"}`}
                                  ></div>
                                  {plan.nombre}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {planDetails && (
                          <div className="space-y-1">
                            <div className="text-sm">
                              <span className="text-blue-600 font-medium">Aéreo: ${planDetails.precioAereo}/lb</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-green-600 font-medium">
                                Marítimo: ${planDetails.precioMaritimo}/lb
                              </span>
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="font-bold text-blue-600">{sucursal.clientesAsignados}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-green-500" />
                          <span className="font-bold text-green-600">{sucursal.paquetesMes}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${
                              sucursal.activa
                                ? "bg-gradient-to-r from-green-500 to-green-600"
                                : "bg-gradient-to-r from-gray-500 to-gray-600"
                            } text-white shadow-lg font-medium px-3 py-1`}
                          >
                            {sucursal.activa ? "Activa" : "Inactiva"}
                          </Badge>
                          {tieneCambios && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg font-medium px-2 py-1 text-xs">
                              Cambio Pendiente
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {hayCambiosPendientes && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Save className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Cambios Pendientes</h3>
                  <p className="text-sm text-slate-600">
                    Tienes {Object.keys(cambiosPendientes).length} cambios sin aplicar. Haz clic en "Aplicar Cambios"
                    para guardarlos.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={descartarCambios} className="border-slate-200 hover:bg-slate-50">
                  Descartar
                </Button>
                <Button
                  onClick={aplicarCambios}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Aplicar Cambios
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
