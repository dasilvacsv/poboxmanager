"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, DollarSign, Package, Plane, Ship, Save, Eye } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function CrearPlanesPage() {
  const router = useRouter()
  const [planData, setPlanData] = useState({
    nombre: "",
    descripcion: "",
    precioAereo: 0,
    precioMaritimo: 0,
    pesoMinimo: 0,
    activo: true,
    caracteristicas: [] as string[],
  })

  const [nuevaCaracteristica, setNuevaCaracteristica] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setPlanData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const agregarCaracteristica = () => {
    if (nuevaCaracteristica.trim()) {
      setPlanData((prev) => ({
        ...prev,
        caracteristicas: [...prev.caracteristicas, nuevaCaracteristica.trim()],
      }))
      setNuevaCaracteristica("")
    }
  }

  const eliminarCaracteristica = (index: number) => {
    setPlanData((prev) => ({
      ...prev,
      caracteristicas: prev.caracteristicas.filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    if (!planData.nombre || !planData.descripcion || planData.precioAereo <= 0 || planData.precioMaritimo <= 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      })
      return
    }

    console.log("Guardando plan:", planData)
    toast({
      title: "Plan creado exitosamente",
      description: `El plan "${planData.nombre}" ha sido creado correctamente.`,
    })

    // Redirect to plans list after successful creation
    setTimeout(() => {
      router.push("/dashboard/planes")
    }, 1500)
  }

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Crear Nuevo Plan
          </h1>
          <p className="text-slate-600 text-lg">
            Diseña planes flexibles con precios independientes para aéreo y marítimo
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-slate-200">
            <Eye className="w-4 h-4 mr-2" />
            Vista Previa
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Target className="w-5 h-5 text-white" />
                </div>
                Información Básica del Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="nombre" className="text-sm font-semibold text-slate-700">
                  Nombre del Plan
                </Label>
                <Input
                  id="nombre"
                  value={planData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Ej: Plan Regular, Plan Emprendedor, Plan Marítimo Premium"
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="descripcion" className="text-sm font-semibold text-slate-700">
                  Descripción
                </Label>
                <Textarea
                  id="descripcion"
                  value={planData.descripcion}
                  onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  placeholder="Describe las características y beneficios de este plan..."
                  rows={4}
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="activo" className="font-medium text-slate-700">
                      Plan Activo
                    </Label>
                    <p className="text-sm text-slate-500">El plan estará disponible para asignar a sucursales</p>
                  </div>
                </div>
                <Switch
                  id="activo"
                  checked={planData.activo}
                  onCheckedChange={(checked) => handleInputChange("activo", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                Configuración de Precios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                        <Plane className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Precio Aéreo</h4>
                        <p className="text-sm text-slate-600">Por libra de peso real</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="precioAereo" className="text-sm font-medium text-slate-700">
                        Precio por libra ($)
                      </Label>
                      <Input
                        id="precioAereo"
                        type="number"
                        step="0.01"
                        value={planData.precioAereo}
                        onChange={(e) => handleInputChange("precioAereo", Number(e.target.value))}
                        placeholder="2.50"
                        className="border-slate-200 focus:border-blue-400 rounded-xl"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 bg-green-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                        <Ship className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">Precio Marítimo</h4>
                        <p className="text-sm text-slate-600">Por libra de peso volumétrico</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="precioMaritimo" className="text-sm font-medium text-slate-700">
                        Precio por libra ($)
                      </Label>
                      <Input
                        id="precioMaritimo"
                        type="number"
                        step="0.01"
                        value={planData.precioMaritimo}
                        onChange={(e) => handleInputChange("precioMaritimo", Number(e.target.value))}
                        placeholder="1.20"
                        className="border-slate-200 focus:border-green-400 rounded-xl"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <Label htmlFor="pesoMinimo" className="text-sm font-semibold text-slate-700">
                  Peso Mínimo (lbs)
                </Label>
                <Input
                  id="pesoMinimo"
                  type="number"
                  step="0.1"
                  value={planData.pesoMinimo}
                  onChange={(e) => handleInputChange("pesoMinimo", Number(e.target.value))}
                  placeholder="0.5"
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl max-w-xs"
                />
                <p className="text-sm text-slate-500">Peso mínimo facturable para este plan</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                  <Package className="w-5 h-5 text-white" />
                </div>
                Características del Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-3">
                <Input
                  value={nuevaCaracteristica}
                  onChange={(e) => setNuevaCaracteristica(e.target.value)}
                  placeholder="Agregar característica..."
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  onKeyPress={(e) => e.key === "Enter" && agregarCaracteristica()}
                />
                <Button onClick={agregarCaracteristica} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {planData.caracteristicas.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {planData.caracteristicas.map((caracteristica, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-blue-50 border-blue-200 text-blue-700 px-3 py-1 cursor-pointer hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
                        onClick={() => eliminarCaracteristica(index)}
                      >
                        {caracteristica} ×
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm italic">No hay características agregadas</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                Vista Previa del Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="font-bold text-lg text-slate-800 mb-2">{planData.nombre || "Nombre del Plan"}</h3>
                <p className="text-sm text-slate-600 mb-4">{planData.descripcion || "Descripción del plan..."}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Aéreo:</span>
                    </div>
                    <span className="font-bold text-blue-600">${planData.precioAereo.toFixed(2)}/lb</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Ship className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Marítimo:</span>
                    </div>
                    <span className="font-bold text-green-600">${planData.precioMaritimo.toFixed(2)}/lb</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Peso mínimo:</span>
                    <span className="font-medium">{planData.pesoMinimo} lbs</span>
                  </div>
                </div>

                {planData.caracteristicas.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <h4 className="font-medium text-slate-700 mb-2">Características:</h4>
                    <ul className="space-y-1">
                      {planData.caracteristicas.map((caracteristica, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {caracteristica}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-blue-200">
                  <Badge
                    className={`${planData.activo ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-gray-500 to-gray-600"} text-white shadow-lg`}
                  >
                    {planData.activo ? "Plan Activo" : "Plan Inactivo"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
