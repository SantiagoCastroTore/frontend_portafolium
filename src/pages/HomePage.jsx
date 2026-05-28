import { ContactForm } from "../components/ContactForm";
import { Code, Layout, Database, MessageSquare } from "lucide-react";

const HomePage = () => {
  return (
    <div className="font-sans text-brand-dark">
      
      
      <section className="pt-20 pb-10 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          Développeur Full-stack
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 font-medium">
          Solo agrego el texto para despues colocar algo creativo y quizas en ingles
        </p>
        
        <div className="relative mb-16">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1jWXsYTijwUVsko7IiuJAoTJRcs1Z9Gb2ew&s"
            alt="Mon Avatar"
            className="w-40 h-40 mx-auto rounded-full border-4 border-slate-100 shadow-sm"
          />
        </div>


  
      </section>

      <section className="bg-brand-purple py-28 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 italic">Salut, je suis Santiago Torres.</h2>
          <p className="text-lg md:text-xl leading-relaxed opacity-90">
           
Passionné par le code, je viens de terminer mes études en développement informatique. Durant mon parcours, j'ai pu collaborer sur des projets académiques et développer mes propres applications. J'aborde ce métier avec une curiosité naturelle et une envie constante d'apprendre, prêt à mettre mon énergie au service d'une première opportunité professionnelle.
          </p>
        </div>
      </section>

      {/* Las cajas que flotan sobre el bloque anterior */}
      <section className="relative -mt-20 px-4 pb-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 justify-between text-center">
    
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-12 space-y-6 w-full max-w-md mx-auto md:ml-0 overflow-hidden">
      <div className="bg-brand-purple/10 text-brand-purple w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Code size={32} />
      </div>
      <h3 className="text-2xl font-black">Front-end</h3>
      <p className="text-slate-600">Je préfère coder les choses à partir de zéro et j'aime donner vie à des idées dans le navigateur.</p>
      <div className="space-y-2">
        <p className="text-brand-purple font-bold">Langages & Outils:</p>
        <p className="text-slate-700 italic">React, Tailwind, JavaScript, Vite</p>
      </div>
    </div>

    
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-12 space-y-6 w-full max-w-md mx-auto md:mr-0 overflow-hidden">
      <div className="bg-amber-100 text-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Database size={32} />
      </div>
      <h3 className="text-2xl font-black">Back-end</h3>
    
      <p className="text-slate-600">Je construis des API robustes et des bases de données optimisées pour des performances maximales.</p>
      <div className="space-y-2">
        <p className="text-brand-purple font-bold">Stack Technique:</p>
        <p className="text-slate-700 italic">Node.js, Express y SQL</p>
      </div>
    </div>

  </div>
</section>
      <section className="py-20 px-4 bg-white relative">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
             <h2 className="text-4xl font-black mb-4">Démarrer un projet</h2>
             <p className="text-xl text-slate-500">Je suis toujours ouvert à discuter de votre travail de conception ou d'opportunités de partenariat.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-t-8 border-brand-purple">
             <ContactForm />
          </div>

        </div>
      </section>

      <footer className="bg-brand-purple py-20 text-center text-white/70">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-3xl font-black text-white mb-8 tracking-tighter">
            PORTFOLIO<span className="text-white/30">.</span>
          </div>
          <p className="text-lg italic mb-10">Vivir, aprender e intentar un dia a la vez </p>
          <div className="flex justify-center gap-6 mb-12 text-white">
          </div>
          <p className="text-sm">Cali © </p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;