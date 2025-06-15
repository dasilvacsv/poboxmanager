"use client"

// --- Imports de React y Librerías ---
import { useState, useEffect, useMemo } from "react"
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { Underline as TiptapUnderline } from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import CharacterCount from "@tiptap/extension-character-count"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// --- Componentes de UI (shadcn/ui) ---
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useToast } from "@/components/ui/use-toast"

// --- Iconos (lucide-react) ---
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link as LinkIcon,
  Undo, Redo, Save, Eye, Paperclip, Send, Type, Sparkles, Users, Mail, CheckCircle,
  Strikethrough, Quote, Code, Heading1, Heading2, Heading3, Eraser, Clock, TestTube2, Braces,
  Info, Rocket, Edit, X
} from "lucide-react"

// --- Tipos de Datos ---
type RecipientOption = { value: string; label: string; count: number; icon: React.ElementType }
type EmailTemplate = { id: string; name: string; subject: string; content: string }

// --- Componente Reutilizable para Botones de la Toolbar ---
const ToolbarButton = ({ onClick, isActive, tooltip, children }: { onClick: () => void, isActive: boolean, tooltip: string, children: React.ReactNode }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant={isActive ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={onClick}>
        {children}
      </Button>
    </TooltipTrigger>
    <TooltipContent><p>{tooltip}</p></TooltipContent>
  </Tooltip>
)

// --- Componente Principal ---
export default function EmailPage() {
  // --- Estados Principales ---
  const [recipientList, setRecipientList] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [scheduledDateTime, setScheduledDateTime] = useState<Date | undefined>()
  const [testEmailAddress, setTestEmailAddress] = useState<string>("")
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [saveTemplateDialogOpen, setSaveTemplateDialogOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");

  const { toast } = useToast()

  // --- Configuración del Editor TipTap ---
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Placeholder.configure({ placeholder: "Empieza a escribir una campaña increíble..." }),
      TiptapUnderline, Link.configure({ openOnClick: false, autolink: true }),
      CharacterCount.configure({ limit: 10000 }),
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base focus:outline-none p-6 min-h-[400px] w-full',
      },
    },
  })

  const contentHTML = useMemo(() => editor?.getHTML() || "", [editor?.state.doc])
  const characterCount = editor?.storage.characterCount.characters() || 0;
  const wordCount = editor?.storage.characterCount.words() || 0;

  // --- Datos de Ejemplo ---
  const recipientOptions: RecipientOption[] = [
    { value: "todos", label: "Todos los Suscriptores", count: 1250, icon: Users },
    { value: "clientes-activos", label: "Clientes Activos", count: 850, icon: Users },
    { value: "leads-calientes", label: "Leads Calientes (Q3)", count: 200, icon: Users },
  ]
  const selectedOption = recipientOptions.find(opt => opt.value === recipientList)

  // --- Lógica de Acciones ---
  const handleSendOrSchedule = async (isScheduled = false) => {
    setIsSending(true)
    const action = isScheduled ? `programado para ${format(scheduledDateTime!, "PPPPp", { locale: es })}` : "enviado";
    
    setTimeout(() => {
      setIsSending(false)
      setIsSuccess(true); // Muestra la vista de éxito
      // Lógica de reseteo se mueve a handleCreateAnother
    }, 2000)
  }

  const handleCreateAnother = () => {
      editor?.commands.clearContent();
      setSubject("");
      setRecipientList("");
      setScheduledDateTime(undefined);
      setIsSuccess(false);
  }

  const handleSendTest = () => {
     if (!/^\S+@\S+\.\S+$/.test(testEmailAddress)) {
        toast({ title: "Email Inválido", description: "Por favor, introduce una dirección de email válida.", variant: "destructive" });
        return;
     }
     toast({
        title: "Prueba Enviada",
        description: `Un email de prueba ha sido enviado a ${testEmailAddress}. Revisa la bandeja de entrada.`,
     });
  }
  
  const handleSaveTemplate = () => {
    if (newTemplateName && subject && contentHTML !== "<p></p>") {
      const newTemplate: EmailTemplate = { id: `t-${Date.now()}`, name: newTemplateName, subject, content: contentHTML };
      setTemplates(prev => [newTemplate, ...prev]);
      toast({ title: "Plantilla Guardada", description: `La plantilla "${newTemplateName}" ha sido creada.` });
      setNewTemplateName("");
      setSaveTemplateDialogOpen(false);
    } else {
      toast({ title: "Faltan Datos", description: "Asegúrate de que el nombre, asunto y contenido no estén vacíos.", variant: "destructive" });
    }
  };

  const loadTemplate = (template: EmailTemplate) => {
    setSubject(template.subject);
    editor?.commands.setContent(template.content);
    toast({ title: "Plantilla Cargada", description: `Has cargado la plantilla "${template.name}".`});
  }

  // --- Componentes Internos ---
  const EditorToolbar = ({ editor }: { editor: any }) => {
    if (!editor) return null;
    const placeholders = [ { value: "{{nombre}}", label: "Nombre" }, { value: "{{apellido}}", label: "Apellido" }, { value: "{{email}}", label: "Email" }]

    return (
       <TooltipProvider delayDuration={100}>
        <div className="bg-slate-50 border-b-2 border-slate-200 rounded-t-xl p-2 sticky top-0 z-10 flex flex-wrap gap-1">
            <ToolbarButton tooltip="Deshacer" onClick={() => editor.chain().focus().undo().run()} isActive={false}><Undo className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton tooltip="Rehacer" onClick={() => editor.chain().focus().redo().run()} isActive={false}><Redo className="w-4 h-4" /></ToolbarButton>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
            <ToolbarButton tooltip="Título 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}><Heading1 className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton tooltip="Título 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}><Heading2 className="w-4 h-4" /></ToolbarButton>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
            <ToolbarButton tooltip="Negrita" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}><Bold className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton tooltip="Cursiva" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}><Italic className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton tooltip="Subrayado" onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}><Underline className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton tooltip="Tachado" onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}><Strikethrough className="w-4 h-4" /></ToolbarButton>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
            <ToolbarButton tooltip="Lista" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}><List className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton tooltip="Lista Numerada" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}><ListOrdered className="w-4 h-4" /></ToolbarButton>
            <ToolbarButton tooltip="Cita" onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}><Quote className="w-4 h-4" /></ToolbarButton>
            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
            <Popover>
              <PopoverTrigger asChild><Button variant="ghost" size="sm"><Braces className="w-4 h-4 mr-1" /> Variables</Button></PopoverTrigger>
              <PopoverContent className="w-56 p-2">{placeholders.map(p => (
                <Button key={p.value} variant="ghost" className="justify-start w-full" onClick={() => editor.chain().focus().insertContent(p.value).run()}>
                    {p.label} <span className="text-muted-foreground ml-auto font-mono text-xs">{p.value}</span>
                </Button>))}</PopoverContent>
            </Popover>
        </div>
      </TooltipProvider>
    );
  };
  
  const SuccessView = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl shadow-xl border border-green-200">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Rocket className="w-10 h-10 text-green-600"/>
        </div>
        <h2 className="text-3xl font-bold text-slate-800">¡Campaña en Camino!</h2>
        <p className="text-slate-600 mt-2 max-w-md">Tu email ha sido enviado/programado exitosamente. Pronto podrás ver las estadísticas en tu panel de control.</p>
        <div className="flex gap-4 mt-8">
            <Button size="lg" onClick={handleCreateAnother}><Edit className="w-4 h-4 mr-2" /> Crear otra Campaña</Button>
            <Button size="lg" variant="outline">Ir al Panel de Control</Button>
        </div>
    </motion.div>
  )
  
  if(isSuccess) {
    return (
        <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
            <SuccessView/>
        </div>
    )
  }

  return (
    <AnimatePresence>
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"><Mail className="w-6 h-6 text-white" /></div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Nueva Campaña de Email</h1>
            <p className="text-slate-500 text-base sm:text-lg">Diseña, personaliza y llega a tu audiencia de forma efectiva.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Editor */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="lg:col-span-8">
            <Card className="shadow-xl bg-white border-slate-200/80">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-2xl text-slate-800">Editor</CardTitle>
                    <CardDescription>Construye tu mensaje aquí.</CardDescription>
                </div>
                <Button variant={isPreview ? "default" : "outline"} size="sm" onClick={() => setIsPreview(!isPreview)} className="flex-shrink-0">
                    <Eye className="w-4 h-4 mr-2" />{isPreview ? "Volver al Editor" : "Vista Previa"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="recipients" className="font-semibold text-slate-700">1. Seleccionar Destinatarios</Label>
                    <Select value={recipientList} onValueChange={setRecipientList}><SelectTrigger id="recipients" className="h-12 text-base"><SelectValue placeholder="Selecciona una lista..." /></SelectTrigger>
                      <SelectContent>{recipientOptions.map((o) => (<SelectItem key={o.value} value={o.value} className="py-2"><div className="flex items-center gap-3"><o.icon className="w-5 h-5 text-blue-500" /><span>{o.label}</span><span className="ml-auto text-xs font-mono bg-slate-100 px-2 py-0.5 rounded-full">{o.count}</span></div></SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-semibold text-slate-700">2. Escribir Asunto</Label>
                    <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ej: ¡Novedades de Junio que te encantarán!" className="h-12 text-base"/>
                  </div>
                </div>
                {selectedOption && <Alert className="bg-blue-50 border-blue-200"><Info className="h-4 w-4 !text-blue-600" /><AlertTitle className="text-blue-800">Lista Seleccionada</AlertTitle><AlertDescription className="text-blue-700">Esta campaña se enviará a <strong>{selectedOption.count} destinatarios</strong> de la lista "{selectedOption.label}".</AlertDescription></Alert>}

                <div className="space-y-2">
                  <Label className="font-semibold text-slate-700">3. Crear Contenido</Label>
                  {isPreview ? (
                    <div className="border-2 border-dashed rounded-xl p-8 min-h-[400px] bg-slate-50/50">
                      <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                        <p className="text-sm text-slate-500 mb-4"><strong>Asunto:</strong> {subject || "(sin asunto)"}</p>
                        <div className="border-t pt-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: contentHTML || "<p class='text-slate-400'>El contenido del email aparecerá aquí...</p>" }} />
                      </div>
                    </div>
                  ) : (
                     <div className="border-2 border-slate-200 rounded-xl bg-white shadow-inner">
                        <EditorToolbar editor={editor} />
                        <EditorContent editor={editor} />
                        <div className="text-xs text-slate-400 p-2 text-right border-t bg-slate-50/80 rounded-b-xl font-mono">{wordCount} palabras / {characterCount} caracteres</div>
                     </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t">
                    <Dialog open={saveTemplateDialogOpen} onOpenChange={setSaveTemplateDialogOpen}>
                      <DialogTrigger asChild><Button variant="outline"><Save className="w-4 h-4 mr-2"/>Guardar como Plantilla</Button></DialogTrigger>
                      <DialogContent><DialogHeader><DialogTitle>Guardar Plantilla Nueva</DialogTitle></DialogHeader>
                          <div className="space-y-2"><Label htmlFor="templateName">Nombre de la Plantilla</Label><Input id="templateName" value={newTemplateName} onChange={e => setNewTemplateName(e.target.value)} placeholder="Ej: Anuncio de Producto"/></div>
                          <DialogFooter><Button onClick={handleSaveTemplate}>Guardar Plantilla</Button></DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild><Button variant="outline"><Clock className="w-4 h-4 mr-2"/>Programar</Button></DialogTrigger>
                          <DialogContent><DialogHeader><DialogTitle>Programar Envío</DialogTitle></DialogHeader>
                              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                                  <Calendar mode="single" selected={scheduledDateTime} onSelect={setScheduledDateTime} className="rounded-md border"/>
                                  <div className="space-y-2"><Label>Hora de envío</Label><Input type="time" value={scheduledDateTime ? format(scheduledDateTime, "HH:mm") : ""} onChange={e => {const time = e.target.value.split(':'); setScheduledDateTime(currentDate => {const newDate = currentDate ? new Date(currentDate) : new Date(); newDate.setHours(parseInt(time[0]), parseInt(time[1])); return newDate; })}}/></div>
                              </div>
                              <DialogFooter><Button onClick={() => handleSendOrSchedule(true)} disabled={!scheduledDateTime}>Confirmar para {scheduledDateTime ? format(scheduledDateTime, "PPp", {locale: es}) : ""}</Button></DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button size="lg" onClick={() => handleSendOrSchedule()} disabled={isSending || !recipientList || !subject || !contentHTML} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg">
                            {isSending ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div> : <Send className="w-5 h-5 mr-2" />}
                            {isSending ? "Enviando..." : "Enviar Ahora"}
                        </Button>
                    </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="lg:col-span-4 space-y-6">
             <Card className="shadow-xl bg-white border-slate-200/80"><CardHeader><CardTitle className="flex items-center gap-2"><TestTube2 className="w-5 h-5 text-blue-500"/>Enviar Prueba Rápida</CardTitle></CardHeader>
                <CardContent className="flex gap-2"><Input placeholder="tu-email@ejemplo.com" value={testEmailAddress} onChange={e => setTestEmailAddress(e.target.value)} /><Button variant="secondary" onClick={handleSendTest} className="flex-shrink-0">Enviar</Button></CardContent>
             </Card>
            <Card className="shadow-xl bg-white border-slate-200/80"><CardHeader><CardTitle className="flex items-center gap-2"><Type className="w-5 h-5 text-slate-700" /> Mis Plantillas</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {templates.length > 0 ? templates.map(t => (<Button key={t.id} variant="ghost" className="w-full justify-start" onClick={() => loadTemplate(t)}>{t.name}</Button>)) : (<p className="text-sm text-slate-500 text-center py-4">Aún no has guardado plantillas.</p>)}
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-xl bg-white border-slate-200/80"><CardHeader className="bg-slate-800 text-white rounded-t-lg"><CardTitle className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Estadísticas (Últimos 30d)</CardTitle></CardHeader>
              <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center"><span className="text-slate-600">Enviados</span><span className="font-bold text-2xl text-slate-800">1,482</span></div>
                  <HoverCard><HoverCardTrigger asChild><div className="flex justify-between items-center cursor-pointer"><span className="text-slate-600">Tasa Apertura</span><span className="font-bold text-2xl text-blue-600">68%</span></div></HoverCardTrigger><HoverCardContent>Un 68% de los destinatarios abrió el email.</HoverCardContent></HoverCard>
                  <HoverCard><HoverCardTrigger asChild><div className="flex justify-between items-center cursor-pointer"><span className="text-slate-600">Tasa Clicks</span><span className="font-bold text-2xl text-purple-600">24%</span></div></HoverCardTrigger><HoverCardContent>Un 24% de quienes abrieron el email hicieron click en un enlace.</HoverCardContent></HoverCard>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
    </AnimatePresence>
  )
}