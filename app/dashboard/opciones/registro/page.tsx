"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Settings, Eye, Code, Zap, CheckCircle, Copy } from "lucide-react"

export default function FormularioRegistroPage() {
  const [formConfig, setFormConfig] = useState({
    campos: {
      nombre: { requerido: true, visible: true },
      apellido: { requerido: true, visible: true },
      email: { requerido: true, visible: true },
      telefono: { requerido: false, visible: true },
      direccion: { requerido: true, visible: true },
      ciudad: { requerido: true, visible: true },
      estado: { requerido: true, visible: true },
      codigoPostal: { requerido: true, visible: true },
      fechaNacimiento: { requerido: false, visible: false },
      identificacion: { requerido: false, visible: true },
    },
    configuracion: {
      verificacionEmail: true,
      aprobacionManual: false,
      membresiaDefault: "Básica",
      notificarAdmin: true,
      redireccionExito: "/bienvenida",
    },
    textos: {
      titulo: "Registro de Cliente",
      subtitulo: "Complete el formulario para crear su cuenta",
      botonEnviar: "Crear Cuenta",
      mensajeExito: "¡Registro exitoso! Revise su email para confirmar su cuenta.",
      terminosCondiciones: "Al registrarse, acepta nuestros términos y condiciones.",
    },
  })

  const handleCampoChange = (campo: string, propiedad: string, valor: boolean) => {
    setFormConfig((prev) => ({
      ...prev,
      campos: {
        ...prev.campos,
        [campo]: {
          ...prev.campos[campo as keyof typeof prev.campos],
          [propiedad]: valor,
        },
      },
    }))
  }

  const handleConfigChange = (campo: string, valor: any) => {
    setFormConfig((prev) => ({
      ...prev,
      configuracion: {
        ...prev.configuracion,
        [campo]: valor,
      },
    }))
  }

  const handleTextoChange = (campo: string, valor: string) => {
    setFormConfig((prev) => ({
      ...prev,
      textos: {
        ...prev.textos,
        [campo]: valor,
      },
    }))
  }

  const handleSave = () => {
    console.log("Guardando configuración del formulario:", formConfig)
    alert("Configuración guardada exitosamente")
  }

  const generateCode = () => {
    const code = `
<form action="/api/register" method="POST">
  <h2>${formConfig.textos.titulo}</h2>
  <p>${formConfig.textos.subtitulo}</p>
  
  ${Object.entries(formConfig.campos)
    .filter(([_, config]) => config.visible)
    .map(
      ([campo, config]) => `
  <div>
    <label for="${campo}">${campo.charAt(0).toUpperCase() + campo.slice(1)}${config.requerido ? " *" : ""}</label>
    <input type="text" id="${campo}" name="${campo}" ${config.requerido ? "required" : ""} />
  </div>`,
    )
    .join("")}
  
  <button type="submit">${formConfig.textos.botonEnviar}</button>
  <p>${formConfig.textos.terminosCondiciones}</p>
</form>
    `.trim()

    navigator.clipboard.writeText(code)
    alert("Código copiado al portapapeles")
  }

  const getCampoName = (campo: string) => {
    const names: { [key: string]: string } = {
      nombre: "Nombre",
      apellido: "Apellido",
      email: "Email",
      telefono: "Teléfono",
      direccion: "Dirección",
      ciudad: "Ciudad",
      estado: "Estado",
      codigoPostal: "Código Postal",
      fechaNacimiento: "Fecha de Nacimiento",
      identificacion: "Identificación"
    }
    return names[campo] || campo
  }

  const visibleFields = Object.entries(formConfig.campos).filter(([_, config]) => config.visible).length
  const requiredFields = Object.entries(formConfig.campos).filter(([_, config]) => config.requerido && config.visible).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Formulario de Registro
              </h1>
              <p className="text-lg text-gray-600 mt-2">Configura el formulario de registro para nuevos clientes</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Campos Visibles</p>
                  <p className="text-3xl font-bold text-gray-900">{visibleFields}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Campos Requeridos</p>
                  <p className="text-3xl font-bold text-gray-900">{requiredFields}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Verificación Email</p>
                  <p className="text-3xl font-bold text-gray-900">{formConfig.configuracion.verificacionEmail ? "Sí" : "No"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campos" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="campos" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Campos
            </TabsTrigger>
            <TabsTrigger value="configuracion" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Config
            </TabsTrigger>
            <TabsTrigger value="textos" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Textos
            </TabsTrigger>
            <TabsTrigger value="codigo" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Código
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campos" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  Configuración de Campos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(formConfig.campos).map(([campo, config]) => (
                    <Card key={campo} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <Label className="font-semibold text-lg">{getCampoName(campo)}</Label>
                              <p className="text-sm text-gray-500">Campo para {getCampoName(campo).toLowerCase()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-3">
                              <Switch
                                checked={config.visible}
                                onCheckedChange={(checked) => handleCampoChange(campo, "visible", checked)}
                              />
                              <Label className="text-sm font-medium">Visible</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Switch
                                checked={config.requerido}
                                onCheckedChange={(checked) => handleCampoChange(campo, "requerido", checked)}
                                disabled={!config.visible}
                              />
                              <Label className="text-sm font-medium">Requerido</Label>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracion" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                    <UserPlus className="w-5 h-5 text-white" />
                  </div>
                  Configuración General
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <Label htmlFor="verificacion-email" className="text-base font-semibold">Verificación por Email</Label>
                            <p className="text-sm text-gray-500">Requiere verificación de email antes de activar la cuenta</p>
                          </div>
                        </div>
                        <Switch
                          id="verificacion-email"
                          checked={formConfig.configuracion.verificacionEmail}
                          onCheckedChange={(checked) => handleConfigChange("verificacionEmail", checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                            <Settings className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <Label htmlFor="aprobacion-manual" className="text-base font-semibold">Aprobación Manual</Label>
                            <p className="text-sm text-gray-500">Los registros requieren aprobación manual del administrador</p>
                          </div>
                        </div>
                        <Switch
                          id="aprobacion-manual"
                          checked={formConfig.configuracion.aprobacionManual}
                          onCheckedChange={(checked) => handleConfigChange("aprobacionManual", checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <Label htmlFor="notificar-admin" className="text-base font-semibold">Notificar Administrador</Label>
                            <p className="text-sm text-gray-500">Enviar notificación al admin cuando hay nuevos registros</p>
                          </div>
                        </div>
                        <Switch
                          id="notificar-admin"
                          checked={formConfig.configuracion.notificarAdmin}
                          onCheckedChange={(checked) => handleConfigChange("notificarAdmin", checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="membresia-default">Membresía por Defecto</Label>
                    <Select
                      value={formConfig.configuracion.membresiaDefault}
                      onValueChange={(value) => handleConfigChange("membresiaDefault", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Básica">Básica</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="VIP">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="redireccion">URL de Redirección (Éxito)</Label>
                    <Input
                      id="redireccion"
                      value={formConfig.configuracion.redireccionExito}
                      onChange={(e) => handleConfigChange("redireccionExito", e.target.value)}
                      placeholder="/bienvenida"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="textos" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  Personalización de Textos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="titulo">Título del Formulario</Label>
                    <Input
                      id="titulo"
                      value={formConfig.textos.titulo}
                      onChange={(e) => handleTextoChange("titulo", e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="boton-enviar">Texto del Botón</Label>
                    <Input
                      id="boton-enviar"
                      value={formConfig.textos.botonEnviar}
                      onChange={(e) => handleTextoChange("botonEnviar", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="subtitulo">Subtítulo</Label>
                  <Input
                    id="subtitulo"
                    value={formConfig.textos.subtitulo}
                    onChange={(e) => handleTextoChange("subtitulo", e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="mensaje-exito">Mensaje de Éxito</Label>
                  <Textarea
                    id="mensaje-exito"
                    value={formConfig.textos.mensajeExito}
                    onChange={(e) => handleTextoChange("mensajeExito", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="terminos">Términos y Condiciones</Label>
                  <Textarea
                    id="terminos"
                    value={formConfig.textos.terminosCondiciones}
                    onChange={(e) => handleTextoChange("terminosCondiciones", e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="codigo" className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    Código del Formulario
                  </CardTitle>
                  <Button onClick={generateCode} variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Código
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                  <pre className="text-sm overflow-x-auto text-gray-800">
                    <code>{`<form action="/api/register" method="POST">
  <h2>${formConfig.textos.titulo}</h2>
  <p>${formConfig.textos.subtitulo}</p>
  
  ${Object.entries(formConfig.campos)
    .filter(([_, config]) => config.visible)
    .map(
      ([campo, config]) => `<div>
    <label for="${campo}">${getCampoName(campo)}${config.requerido ? " *" : ""}</label>
    <input type="text" id="${campo}" name="${campo}" ${config.requerido ? "required" : ""} />
  </div>`,
    )
    .join("\n  ")}
  
  <button type="submit">${formConfig.textos.botonEnviar}</button>
  <p>${formConfig.textos.terminosCondiciones}</p>
</form>`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSave}>
            <UserPlus className="w-4 h-4 mr-2" />
            Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  )
}