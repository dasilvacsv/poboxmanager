"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { CreditCard, Plus, Edit, Trash2, Shield, Calendar, DollarSign } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

interface PaymentMethod {
  id: number
  tipo: 'Tarjeta de Crédito' | 'Tarjeta de Débito' | 'PayPal' | 'Transferencia Bancaria'
  nombre: string
  numero: string
  fechaExpiracion?: string
  banco?: string
  predeterminado: boolean
  activo: boolean
  fechaAgregado: string
  ultimoUso: string
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 1,
    tipo: "Tarjeta de Crédito",
    nombre: "Visa Principal",
    numero: "**** **** **** 1234",
    fechaExpiracion: "12/26",
    banco: "Chase Bank",
    predeterminado: true,
    activo: true,
    fechaAgregado: "2023-01-15",
    ultimoUso: "2024-01-15"
  },
  {
    id: 2,
    tipo: "PayPal",
    nombre: "PayPal Business",
    numero: "business@miamilogistics.com",
    predeterminado: false,
    activo: true,
    fechaAgregado: "2023-06-20",
    ultimoUso: "2024-01-10"
  },
  {
    id: 3,
    tipo: "Tarjeta de Débito",
    nombre: "Mastercard Débito",
    numero: "**** **** **** 5678",
    fechaExpiracion: "08/25",
    banco: "Bank of America",
    predeterminado: false,
    activo: false,
    fechaAgregado: "2023-09-10",
    ultimoUso: "2023-12-20"
  }
]

export default function PaymentMethods() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('client')
  const router = useRouter()
  const pathname = usePathname()

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)

  const [newMethod, setNewMethod] = useState({
    tipo: "" as PaymentMethod['tipo'],
    nombre: "",
    numero: "",
    fechaExpiracion: "",
    cvv: "",
    nombreTitular: "",
    banco: "",
    email: "",
    predeterminado: false
  })

  const [editMethod, setEditMethod] = useState({
    nombre: "",
    fechaExpiracion: "",
    banco: "",
    predeterminado: false,
    activo: true
  })

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

  const handleAddMethod = () => {
    if (!newMethod.tipo || !newMethod.nombre) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      })
      return
    }

    const method: PaymentMethod = {
      id: Date.now(),
      tipo: newMethod.tipo,
      nombre: newMethod.nombre,
      numero: newMethod.tipo === 'PayPal' ? newMethod.email : `**** **** **** ${newMethod.numero.slice(-4)}`,
      fechaExpiracion: newMethod.fechaExpiracion,
      banco: newMethod.banco,
      predeterminado: newMethod.predeterminado,
      activo: true,
      fechaAgregado: new Date().toISOString().split('T')[0],
      ultimoUso: "Nunca"
    }

    // Si se marca como predeterminado, desmarcar los otros
    if (newMethod.predeterminado) {
      setPaymentMethods(prev => prev.map(pm => ({ ...pm, predeterminado: false })))
    }

    setPaymentMethods(prev => [...prev, method])
    setIsAddDialogOpen(false)
    setNewMethod({
      tipo: "" as PaymentMethod['tipo'],
      nombre: "",
      numero: "",
      fechaExpiracion: "",
      cvv: "",
      nombreTitular: "",
      banco: "",
      email: "",
      predeterminado: false
    })

    toast({
      title: "Método de pago agregado",
      description: `${method.nombre} ha sido agregado exitosamente`
    })
  }

  const handleEditMethod = (method: PaymentMethod) => {
    setSelectedMethod(method)
    setEditMethod({
      nombre: method.nombre,
      fechaExpiracion: method.fechaExpiracion || "",
      banco: method.banco || "",
      predeterminado: method.predeterminado,
      activo: method.activo
    })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    if (!selectedMethod) return

    // Si se marca como predeterminado, desmarcar los otros
    if (editMethod.predeterminado && !selectedMethod.predeterminado) {
      setPaymentMethods(prev => prev.map(pm => ({ ...pm, predeterminado: false })))
    }

    setPaymentMethods(prev => prev.map(pm => 
      pm.id === selectedMethod.id 
        ? { ...pm, ...editMethod }
        : pm
    ))

    setIsEditDialogOpen(false)
    toast({
      title: "Método actualizado",
      description: `${editMethod.nombre} ha sido actualizado exitosamente`
    })
  }

  const handleDeleteMethod = (id: number) => {
    const method = paymentMethods.find(pm => pm.id === id)
    setPaymentMethods(prev => prev.filter(pm => pm.id !== id))
    
    toast({
      title: "Método eliminado",
      description: `${method?.nombre} ha sido eliminado`
    })
  }

  const handleSetDefault = (id: number) => {
    setPaymentMethods(prev => prev.map(pm => ({
      ...pm,
      predeterminado: pm.id === id
    })))

    const method = paymentMethods.find(pm => pm.id === id)
    toast({
      title: "Método predeterminado actualizado",
      description: `${method?.nombre} es ahora tu método predeterminado`
    })
  }

  const getTypeIcon = (tipo: PaymentMethod['tipo']) => {
    switch (tipo) {
      case 'Tarjeta de Crédito':
      case 'Tarjeta de Débito':
        return <CreditCard className="w-5 h-5" />
      case 'PayPal':
        return <DollarSign className="w-5 h-5" />
      default:
        return <CreditCard className="w-5 h-5" />
    }
  }

  const getTypeBadgeClass = (tipo: PaymentMethod['tipo']) => {
    switch (tipo) {
      case 'Tarjeta de Crédito':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
      case 'Tarjeta de Débito':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      case 'PayPal':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25 animate-pulse">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Métodos de Pago</h3>
            <p className="text-slate-500">Cargando tus métodos de pago...</p>
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
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Métodos de Pago
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Administra tus métodos de pago y configuraciones de facturación
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Método
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Métodos</p>
                    <p className="text-3xl font-bold text-blue-600">{paymentMethods.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Métodos Activos</p>
                    <p className="text-3xl font-bold text-green-600">
                      {paymentMethods.filter(pm => pm.activo).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Tarjetas</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {paymentMethods.filter(pm => pm.tipo.includes('Tarjeta')).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Otros Métodos</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {paymentMethods.filter(pm => !pm.tipo.includes('Tarjeta')).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                        {getTypeIcon(method.tipo)}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-800">{method.nombre}</CardTitle>
                        <p className="text-sm text-slate-500 font-mono">{method.numero}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getTypeBadgeClass(method.tipo)}>
                        {method.tipo}
                      </Badge>
                      {method.predeterminado && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          Predeterminado
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {method.banco && (
                      <div className="flex items-center text-sm text-slate-600">
                        <Shield className="w-4 h-4 mr-2" />
                        <span>{method.banco}</span>
                      </div>
                    )}
                    {method.fechaExpiracion && (
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Expira: {method.fechaExpiracion}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Último uso: {method.ultimoUso}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={method.activo}
                        onCheckedChange={(checked) => {
                          setPaymentMethods(prev => prev.map(pm => 
                            pm.id === method.id ? { ...pm, activo: checked } : pm
                          ))
                        }}
                      />
                      <span className="text-sm text-slate-600">
                        {method.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditMethod(method)}
                        className="hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMethod(method.id)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {!method.predeterminado && method.activo && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(method.id)}
                      className="w-full hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                    >
                      Establecer como Predeterminado
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Payment Method Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Método de Pago</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipo">Tipo de Método</Label>
                  <Select value={newMethod.tipo} onValueChange={(value) => setNewMethod(prev => ({ ...prev, tipo: value as PaymentMethod['tipo'] }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tarjeta de Crédito">Tarjeta de Crédito</SelectItem>
                      <SelectItem value="Tarjeta de Débito">Tarjeta de Débito</SelectItem>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="Transferencia Bancaria">Transferencia Bancaria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="nombre">Nombre del Método</Label>
                  <Input
                    id="nombre"
                    value={newMethod.nombre}
                    onChange={(e) => setNewMethod(prev => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Ej: Visa Principal"
                  />
                </div>
              </div>

              {newMethod.tipo === 'PayPal' ? (
                <div>
                  <Label htmlFor="email">Email de PayPal</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newMethod.email}
                    onChange={(e) => setNewMethod(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="tu@email.com"
                  />
                </div>
              ) : newMethod.tipo.includes('Tarjeta') ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="numero">Número de Tarjeta</Label>
                      <Input
                        id="numero"
                        value={newMethod.numero}
                        onChange={(e) => setNewMethod(prev => ({ ...prev, numero: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nombreTitular">Nombre del Titular</Label>
                      <Input
                        id="nombreTitular"
                        value={newMethod.nombreTitular}
                        onChange={(e) => setNewMethod(prev => ({ ...prev, nombreTitular: e.target.value }))}
                        placeholder="Nombre completo"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="fechaExp">Fecha Expiración</Label>
                      <Input
                        id="fechaExp"
                        value={newMethod.fechaExpiracion}
                        onChange={(e) => setNewMethod(prev => ({ ...prev, fechaExpiracion: e.target.value }))}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={newMethod.cvv}
                        onChange={(e) => setNewMethod(prev => ({ ...prev, cvv: e.target.value }))}
                        placeholder="123"
                      />
                    </div>
                    <div>
                      <Label htmlFor="banco">Banco</Label>
                      <Input
                        id="banco"
                        value={newMethod.banco}
                        onChange={(e) => setNewMethod(prev => ({ ...prev, banco: e.target.value }))}
                        placeholder="Nombre del banco"
                      />
                    </div>
                  </div>
                </>
              ) : null}

              <div className="flex items-center space-x-2">
                <Switch
                  checked={newMethod.predeterminado}
                  onCheckedChange={(checked) => setNewMethod(prev => ({ ...prev, predeterminado: checked }))}
                />
                <Label>Establecer como método predeterminado</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddMethod}>
                Agregar Método
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Payment Method Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Método de Pago</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="editNombre">Nombre del Método</Label>
                <Input
                  id="editNombre"
                  value={editMethod.nombre}
                  onChange={(e) => setEditMethod(prev => ({ ...prev, nombre: e.target.value }))}
                />
              </div>
              {selectedMethod?.fechaExpiracion && (
                <div>
                  <Label htmlFor="editFecha">Fecha Expiración</Label>
                  <Input
                    id="editFecha"
                    value={editMethod.fechaExpiracion}
                    onChange={(e) => setEditMethod(prev => ({ ...prev, fechaExpiracion: e.target.value }))}
                    placeholder="MM/YY"
                  />
                </div>
              )}
              {selectedMethod?.banco && (
                <div>
                  <Label htmlFor="editBanco">Banco</Label>
                  <Input
                    id="editBanco"
                    value={editMethod.banco}
                    onChange={(e) => setEditMethod(prev => ({ ...prev, banco: e.target.value }))}
                  />
                </div>
              )}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editMethod.activo}
                    onCheckedChange={(checked) => setEditMethod(prev => ({ ...prev, activo: checked }))}
                  />
                  <Label>Método activo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editMethod.predeterminado}
                    onCheckedChange={(checked) => setEditMethod(prev => ({ ...prev, predeterminado: checked }))}
                  />
                  <Label>Método predeterminado</Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEdit}>
                Guardar Cambios
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}