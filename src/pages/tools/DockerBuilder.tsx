import React, { useState, useEffect } from 'react';
import { Box, Copy, Plus, X } from 'lucide-react';
import yaml from 'js-yaml';

interface Service {
    id: string;
    name: string;
    image: string;
    ports: string;
    env: string;
}

export default function DockerBuilder() {
  const [services, setServices] = useState<Service[]>([
      { id: '1', name: 'web', image: 'nginx:alpine', ports: '80:80', env: '' }
  ]);
  const [yamlOutput, setYamlOutput] = useState('');

  const addService = () => {
      setServices([...services, { id: Math.random().toString(), name: `service_${services.length + 1}`, image: 'node:18', ports: '', env: '' }]);
  };

  const removeService = (id: string) => {
      setServices(services.filter(s => s.id !== id));
  };

  const updateService = (id: string, field: string, value: string) => {
      setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  useEffect(() => {
      try {
          const composeObj: any = { version: '3.8', services: {} };
          
          services.forEach(s => {
              if (!s.name) return;
              const srv: any = { image: s.image };
              
              if (s.ports.trim()) {
                  srv.ports = s.ports.split(',').map(p => p.trim());
              }
              if (s.env.trim()) {
                  srv.environment = s.env.split(',').map(e => e.trim());
              }
              
              composeObj.services[s.name] = srv;
          });

          setYamlOutput(yaml.dump(composeObj, { indent: 2, lineWidth: -1 }));
      } catch {
          setYamlOutput('Error generating YAML.');
      }
  }, [services]);

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Box className="w-6 h-6 text-primary" /> Docker Compose Builder</h2>
        <button onClick={() => navigator.clipboard.writeText(yamlOutput)} className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 hover:bg-muted text-sm font-semibold rounded-md border border-border transition-colors">
            <Copy className="w-4 h-4" /> Copy YAML
        </button>
      </div>
      <p className="text-sm text-muted-foreground/80 mb-2">
        Visually construct container configurations, port mappings, and environment variables. Perfectly enforces YAML indentation.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
              {services.map((srv, index) => (
                  <div key={srv.id} className="bg-card border border-border p-5 rounded-xl shadow-sm relative group">
                      <button onClick={() => removeService(srv.id)} className="absolute top-3 right-3 p-1.5 bg-destructive/10 text-destructive rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="w-4 h-4" />
                      </button>
                      
                      <div className="font-bold text-sm mb-4 text-primary">Service {index + 1}</div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Service Name</label>
                              <input value={srv.name} onChange={e => updateService(srv.id, 'name', e.target.value)} className="w-full bg-background border border-border px-3 py-2 rounded-lg text-sm outline-none focus:border-primary" placeholder="postgres" />
                          </div>
                          <div>
                              <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Docker Image</label>
                              <input value={srv.image} onChange={e => updateService(srv.id, 'image', e.target.value)} className="w-full bg-background border border-border px-3 py-2 rounded-lg text-sm outline-none focus:border-primary" placeholder="postgres:15-alpine" />
                          </div>
                      </div>
                      <div className="mb-4">
                          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Ports (comma separated)</label>
                          <input value={srv.ports} onChange={e => updateService(srv.id, 'ports', e.target.value)} className="w-full bg-background border border-border px-3 py-2 rounded-lg text-sm outline-none focus:border-primary font-mono" placeholder="5432:5432, 80:80" />
                      </div>
                      <div>
                          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Environment Variables (comma separated)</label>
                          <input value={srv.env} onChange={e => updateService(srv.id, 'env', e.target.value)} className="w-full bg-background border border-border px-3 py-2 rounded-lg text-sm outline-none focus:border-primary font-mono" placeholder="POSTGRES_USER=admin, NODE_ENV=prod" />
                      </div>
                  </div>
              ))}
              
              <button onClick={addService} className="flex items-center justify-center gap-2 py-4 border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 rounded-xl transition-colors font-semibold text-sm">
                  <Plus className="w-4 h-4" /> Add Container Service
              </button>
          </div>

          <div className="bg-[#1e1e1e] border border-border rounded-xl shadow-sm p-5 overflow-hidden flex flex-col">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">docker-compose.yml</h3>
              <textarea 
                  value={yamlOutput} 
                  readOnly 
                  spellCheck="false"
                  className="w-full flex-1 bg-transparent resize-none outline-none font-mono text-sm leading-relaxed text-blue-300" 
              />
          </div>
      </div>
    </div>
  );
}
