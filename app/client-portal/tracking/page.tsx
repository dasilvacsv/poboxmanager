"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Package, MapPin, Calendar, Truck, CheckCircle, Clock } from "lucide-react"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

export default function TrackingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('client')
  const router = useRouter()
  const pathname = usePathname()

  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [recentSearches, setRecentSearches] = useState([
    "TRK001234567",
    "TRK001234568",
    "TRK001234569"
  ])

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const storedUserType = localStorage.getItem("userType") as 'superadmin' | 'admin' | 'client'
    
    if (!auth || storedUserType !== 'client') {
      router.push("/")
    } else {
      setIsAuthenticated(true)
      setUserType(storedUserType)
    }
  }, [router])

  const handleTrackPackage = async () => {
    if (!trackingNumber.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un número de tracking",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    // Simular búsqueda
    await new Promise(resolve => setTimeout(resolve, 1500))

    const mockResult = {
      tracking: trackingNumber,
      estado: "En Tránsito",
      descripcion: "Electrónicos - iPhone 15 Pro",
      peso: "2.5 lbs",
      dimensiones: "6x4x2 inches",
      origen: "Miami, FL",
      destino: "Tu dirección registrada",
      fechaEnvio: "2024-01-15",
      fechaEstimada: "2024-01-18",
      transportista: "FedEx Express",
      numeroGuia: "1234567890",
      valor: "$1,200.00",
      historial: [
        { 
          fecha: "2024-01-15 10:00", 
          evento: "Paquete recibido en bodega", 
          ubicacion: "Miami Central Warehouse",
          estado: "completed"
        },
        { 
          fecha: "2024-01-15 14:30", 
          evento: "En proceso de clasificación", 
          ubicacion: "Miami Central Warehouse",
          estado: "completed"
        },
        { 
          fecha: "2024-01-16 09:00", 
          evento: "En tránsito hacia destino", 
          ubicacion: "Centro de distribución Miami",
          estado: "completed"
        },
        { 
          fecha: "2024-01-17 08:00", 
          evento: "En ruta de entrega", 
          ubicacion: "Vehículo de entrega local",
          estado: "current"
        },
        { 
          fecha: "2024-01-18 12:00", 
          evento: "Entrega programada", 
          ubicacion: "Dirección de destino",
          estado: "pending"
        }
      ],
    }

    setTrackingResult(mockResult)
    setIsLoading(false)
    
    // Agregar a búsquedas recientes
    if (!recentSearches.includes(trackingNumber)) {
      setRecentSearches(prev => [trackingNumber, ...prev.slice(0, 4)])
    }

    toast({
      title: "Paquete encontrado",
      description: `Estado: ${mockResult.estado}`,
    })
  }

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "current":
        return <Truck className="w-4 h-4 text-blue-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-gray-400" />
      default:
        return <Package className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Entregado":
        return "bg-gradient-to-r from-green-500 to-green-600"
      case "En Tránsito":
        return "bg-gradient-to-r from-blue-500 to-blue-600"
      case "En Bodega":
        return "bg-gradient-to-r from-orange-500 to-orange-600"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25 animate-pulse">
              <Package className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Cargando...</h3>
            <p className="text-slate-500">Rastreo de paquetes</p>
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
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Rastrear Paquete
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Rastrea el estado y ubicación de tus paquetes en tiempo real
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Search Section */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Buscar Paquete
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="tracking">Número de Tracking</Label>
                  <Input
                    id="tracking"
                    placeholder="Ingresa el número de tracking (ej: TRK001234567)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTrackPackage()}
                    className="h-12"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleTrackPackage} 
                    disabled={isLoading}
                    className="h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Search className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? "Buscando..." : "Buscar"}
                  </Button>
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <Label className="text-sm text-slate-600">Búsquedas recientes:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setTrackingNumber(search)}
                        className="text-xs"
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingResult && (
            <div className="space-y-6">
              {/* Package Info */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Información del Paquete
                    </CardTitle>
                    <Badge className={`${getStatusColor(trackingResult.estado)} text-white shadow-lg text-sm px-3 py-1`}>
                      {trackingResult.estado}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-slate-800">Detalles del Envío</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Tracking:</strong> {trackingResult.tracking}</p>
                        <p><strong>Descripción:</strong> {trackingResult.descripcion}</p>
                        <p><strong>Peso:</strong> {trackingResult.peso}</p>
                        <p><strong>Dimensiones:</strong> {trackingResult.dimensiones}</p>
                        <p><strong>Valor:</strong> {trackingResult.valor}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-slate-800">Origen y Destino</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Origen:</strong> {trackingResult.origen}</p>
                        <p><strong>Destino:</strong> {trackingResult.destino}</p>
                        <p><strong>Transportista:</strong> {trackingResult.transportista}</p>
                        <p><strong>Número de Guía:</strong> {trackingResult.numeroGuia}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-slate-800">Fechas Importantes</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Fecha de Envío:</strong> {trackingResult.fechaEnvio}</p>
                        <p><strong>Entrega Estimada:</strong> {trackingResult.fechaEstimada}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-600 font-medium">
                            Entrega en 1 día
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Historial de Seguimiento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingResult.historial.map((evento: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            evento.estado === 'completed' ? 'bg-green-100' :
                            evento.estado === 'current' ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            {getStatusIcon(evento.estado)}
                          </div>
                          {index < trackingResult.historial.length - 1 && (
                            <div className={`w-0.5 h-12 mt-2 ${
                              evento.estado === 'completed' ? 'bg-green-300' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`font-medium ${
                              evento.estado === 'current' ? 'text-blue-600' : 'text-slate-800'
                            }`}>
                              {evento.evento}
                            </p>
                            <span className="text-sm text-slate-500">{evento.fecha}</span>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{evento.ubicacion}</p>
                          {evento.estado === 'current' && (
                            <div className="mt-2">
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                Estado Actual
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Reportar Problema
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Ver en Mapa
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Programar Entrega
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Help Section */}
          {!trackingResult && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>¿Cómo rastrear tu paquete?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Search className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">1. Ingresa el Tracking</h3>
                    <p className="text-sm text-slate-600">
                      Introduce el número de tracking que recibiste por email
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">2. Ve el Estado</h3>
                    <p className="text-sm text-slate-600">
                      Consulta el estado actual y la ubicación de tu paquete
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">3. Sigue el Progreso</h3>
                    <p className="text-sm text-slate-600">
                      Monitorea el progreso hasta la entrega final
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}