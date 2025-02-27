import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User} from "lucide-react"
import { useState } from "react"



export function App() {

  const [isGuestInputOpen, setIsGuestInputOpen ] = useState(false);
  const [isGuestModalOpen, setisGuestModalOpen ] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen ] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState([
    'diego@rocketseat.com',
    'John@rocketseat.com'
  ])

  function openGuestInput(){
    setIsGuestInputOpen(true);
  }

  function closeGuestInput(){
    setIsGuestInputOpen(false);
  }

  function openGuestModal(){
    setisGuestModalOpen(true)
  }
  
  function closeGuestModal(){
    setisGuestModalOpen(false)
  }

  function openConfirmTripModal(){
    setIsConfirmTripModalOpen(true)
  }
  
  function closeConfirmTripModal(){
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if(!email){
      return;
    }
    // implementar um aviso de erro (Não pode inserir o mesmo email) 
    if(emailsToInvite.includes(email)){
      return
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])


    event.currentTarget.reset();
  }

  function removeEmailFromInvite(emailToRemove: string){
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);

    return setEmailsToInvite(newEmailList);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-patter bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400"/>
              <input disabled={isGuestInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-bg-zinc-400 outline-none flex-1"/>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400"/>
              <input disabled={isGuestInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-bg-zinc-400 w-40 outline-none"/>
            </div>

            <div className="w-px h-6 bg-zinc-800"/>

            {isGuestInputOpen ? (
              <button onClick={closeGuestInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
                Alterar local/data
                <Settings2 className="size-5"/>
                </button>
            ):(
              <button onClick={openGuestInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Continuar
                <ArrowRight className="size-5 "/>
              </button>
            )}
           
            
          </div>

          {isGuestInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button type="button" onClick={openGuestModal} className="flex items-center gap-2 flex-1">
              <UserRoundPlus className="size-5 text-zinc-400"/>
              {emailsToInvite.length > 0 ? (
                <span className="text-zinc-100 text-lg flex-1 text-left">
                  {emailsToInvite.length} Pessoa(s) convidada(s)
                </span>
              ) : (
                <span className="text-zinc-400 text-lg flex-1 text-left">Quem estará na viagem?</span>
              )}
            </button>
          
    
            <div className="w-px h-6 bg-zinc-800"/>
    
            <button onClick={openConfirmTripModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              Confirmar viagem
              <ArrowRight className="size-5 "/>
            </button>
            
          </div>
          )}

        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a> </p>
      </div>


      {isGuestModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                <button type="button" onClick={closeGuestModal}>
                  <X className="size-5 text-zinc-400"/>
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação na viagem.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map(email =>{
                return (
                  <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                    <span className="text-zinc-300">{email}</span>
                    <button type="button">
                      <X onClick={() => removeEmailFromInvite(email)} className="size-4 text-zinc-400"/>
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="w-full h-px bg-zinc-800"/>

            <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
             <div className="px-2 flex items-center flex-1 gap-2">
              <AtSign className="size-5 text-zinc-400"/>
              <input 
                type="email" 
                name="email" 
                placeholder="Digite o e-mail do covidado" 
                className="bg-transparent text-lg placeholder-bg-zinc-400 w-40 outline-none flex-1"
                />
             </div>
              <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              Convidar
              <Plus className="size-5 "/>
            </button>
            </form>

          </div>
        </div>
      )}

        {isConfirmTripModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Confirmar criação da viagem</h2>
                  <button type="button" onClick={closeConfirmTripModal}>
                    <X className="size-5 text-zinc-400"/>
                  </button>
                </div>
                <p className="text-sm text-zinc-400">
                  Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
                </p>
              </div>
          
              

              <form onSubmit={addNewEmailToInvite} className="space-y-3">
              <div className="h-14 p-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="size-5 text-zinc-400"/>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Seu nome completo" 
                  className="bg-transparent text-lg placeholder-bg-zinc-400 w-40 outline-none flex-1"
                  />
              </div>

              <div className="h-14 p-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="size-5 text-zinc-400"/>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Seu email pessoal" 
                  className="bg-transparent text-lg placeholder-bg-zinc-400 w-40 outline-none flex-1"
                  />
              </div>
                <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400 w-full justify-center">
                Confirmar criação da viagem
              </button>
              </form>

            </div>
          </div>
        )}




    </div>
  )
}


