import { Link } from "react-router-dom";
import { Eye, CodeXml } from "lucide-react";

export const ProjectCard = ({ project }) => {
  if (!project) return null;

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden text-center">
      
      <div className="relative h-56 overflow-hidden bg-slate-50">
        {project.image_url ? (
          <img 
            src={project.image_url} 
            alt={project.title} 
            loading="lazy" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-200">
            <Code size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8 flex flex-col flex-grow items-center">
        
        <h2 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors tracking-tight">
          {project.title}
        </h2>

        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="mb-8">
          <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
            {project.tech_stack}
          </span>
        </div>

        <div className="mt-auto w-full pt-6 border-t border-slate-50">
          <ul className="flex justify-center gap-8 mb-8 list-none p-0">
            <li>
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-900 transition-all transform hover:scale-110"
                title="Lien github"
              >
                            <CodeXml size={23} />
                <span className="text-[15px] font-bold uppercase tracking-tighter">GITHUB</span>
              </a>
            </li>
          </ul>

          <Link 
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-sm"
          >
            <Eye size={16} />
            Voir plus
          </Link>
        </div>

      </div>
    </div>
  );
};