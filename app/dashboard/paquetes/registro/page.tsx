"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Save, RotateCcw, QrCode } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function RegistroRapidoPage() {
  const [formData, setFormData] = useState({
    tracking: "",
    cliente: "",
    descripcion: "",
    peso: "",
    valor: "",
    origen: "",
    transportista: "",
    notas: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.tracking || !formData.cliente || !formData.descripcion) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Paquete registrado",
      description: `Paquete ${formData.tracking} registrado exitosamente`,
    })

    // Reset form
    setFormData({
      tracking: "",
      cliente: "",
      descripcion: "",
      peso: "",
      valor: "",
      origen: "",
      transportista: "",
      notas: "",
    })
  }

  const generateTrackingNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")
    setFormData((prev) => ({ ...prev, tracking: `TRK${randomNum}` }))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Registro Rápido de Paquetes</h1>
          <p className="text-slate-600">Registra nuevos paquetes de forma rápida y eficiente</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Información del Paquete</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tracking">Número de Tracking *</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="tracking"
                        value={formData.tracking}
                        onChange={(e) => setFormData((prev) => ({ ...prev, tracking: e.target.value }))}
                        placeholder="TRK123456"
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" onClick={generateTrackingNumber}>
                        <QrCode className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cliente">Cliente *</Label>
                    <Select
                      value={formData.cliente}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, cliente: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cliente1">Juan Pérez - PM001</SelectItem>
                        <SelectItem value="cliente2">María García - PM002</SelectItem>
                        <SelectItem value="cliente3">Carlos López - PM003</SelectItem>
                        <SelectItem value="cliente4">Ana Rodríguez - PM004</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="descripcion">Descripción del Contenido *</Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
                    placeholder="Describe el contenido del paquete..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="peso">Peso (lbs)</Label>
                    <Input
                      id="peso"
                      value={formData.peso}
                      onChange={(e) => setFormData((prev) => ({ ...prev, peso: e.target.value }))}
                      placeholder="2.5"
                      type="number"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="valor">Valor Declarado ($)</Label>
                    <Input
                      id="valor"
                      value={formData.valor}
                      onChange={(e) => setFormData((prev) => ({ ...prev, valor: e.target.value }))}
                      placeholder="100.00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transportista">Transportista</Label>
                    <Select
                      value={formData.transportista}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, transportista: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fedex">FedEx</SelectItem>
                        <SelectItem value="ups">UPS</SelectItem>
                        <SelectItem value="dhl">DHL</SelectItem>
                        <SelectItem value="usps">USPS</SelectItem>
                        <SelectItem value="amazon">Amazon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="origen">Origen</Label>
                  <Input
                    id="origen"
                    value={formData.origen}
                    onChange={(e) => setFormData((prev) => ({ ...prev, origen: e.target.value }))}
                    placeholder="Miami, FL"
                  />
                </div>

                <div>
                  <Label htmlFor="notas">Notas Adicionales</Label>
                  <Textarea
                    id="notas"
                    value={formData.notas}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notas: e.target.value }))}
                    placeholder="Notas especiales, instrucciones de manejo, etc."
                    rows={2}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Registrar Paquete
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData({
                        tracking: "",
                        cliente: "",
                        descripcion: "",
                        peso: "",
                        valor: "",
                        origen: "",
                        transportista: "",
                        notas: "",
                      })
                    }
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Limpiar Formulario
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-sm text-blue-600">Paquetes hoy</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">156</div>
                <div className="text-sm text-green-600">Esta semana</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1,234</div>
                <div className="text-sm text-purple-600">Este mes</div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Últimos Registros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">TRK001234</div>
                    <div className="text-xs text-gray-500">Juan Pérez</div>
                  </div>
                  <div className="text-xs text-gray-400">Hace 5 min</div>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">TRK001235</div>
                    <div className="text-xs text-gray-500">María García</div>
                  </div>
                  <div className="text-xs text-gray-400">Hace 12 min</div>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">TRK001236</div>
                    <div className="text-xs text-gray-500">Carlos López</div>
                  </div>
                  <div className="text-xs text-gray-400">Hace 25 min</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
