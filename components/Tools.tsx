import React, { useState } from 'react';
import { ViewState } from '../types';
import { ArrowLeft, Calculator, Activity, BookOpen, Server } from 'lucide-react';

interface ToolProps {
  type: ViewState;
  onBack: () => void;
}

export const ToolView: React.FC<ToolProps> = ({ type, onBack }) => {
  const [calcValue, setCalcValue] = useState<number>(10);
  const [region, setRegion] = useState('ap-southeast');

  const getTitle = () => {
    switch (type) {
      case ViewState.TOOL_ENS_CALC: return 'ENS Pricing Calculator';
      case ViewState.TOOL_ESA_CALC: return 'ESA Pricing Calculator';
      case ViewState.TOOL_BEST_PRACTICE: return 'ENS Best Practices';
      case ViewState.TOOL_ENA_SPEED: return 'ENA Network Speed Test';
      default: return 'Tool';
    }
  };

  const getIcon = () => {
    switch (type) {
        case ViewState.TOOL_ENS_CALC: 
        case ViewState.TOOL_ESA_CALC: return <Calculator className="w-6 h-6" />;
        case ViewState.TOOL_BEST_PRACTICE: return <BookOpen className="w-6 h-6" />;
        case ViewState.TOOL_ENA_SPEED: return <Activity className="w-6 h-6" />;
        default: return <Server className="w-6 h-6" />;
      }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                {getIcon()}
            </div>
            <div>
                <h2 className="text-2xl font-bold">{getTitle()}</h2>
                <p className="text-gray-400 mt-1">Professional tools for cloud management</p>
            </div>
          </div>

          <div className="p-8">
            {(type === ViewState.TOOL_ENS_CALC || type === ViewState.TOOL_ESA_CALC) && (
              <div className="space-y-8 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
                  <select 
                    value={region} 
                    onChange={(e) => setRegion(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 bg-gray-50 p-3 text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="ap-southeast">Asia Pacific (Singapore)</option>
                    <option value="us-west">US West (California)</option>
                    <option value="eu-central">Europe (Frankfurt)</option>
                    <option value="cn-east">China East (Shanghai)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {type === ViewState.TOOL_ENS_CALC ? 'Number of Nodes' : 'Traffic Volume (TB)'}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={calcValue}
                    onChange={(e) => setCalcValue(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="mt-2 text-right font-mono font-bold text-blue-600 text-lg">
                    {calcValue} {type === ViewState.TOOL_ENS_CALC ? 'Nodes' : 'TB'}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Estimated Monthly Cost</h3>
                  <div className="text-4xl font-bold text-slate-900">
                    ${(calcValue * (type === ViewState.TOOL_ENS_CALC ? 120 : 45)).toLocaleString()}
                    <span className="text-lg text-gray-400 font-normal"> /mo</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">* Estimation based on on-demand pricing in {region}.</p>
                </div>
              </div>
            )}

            {type === ViewState.TOOL_BEST_PRACTICE && (
              <div className="prose max-w-none text-gray-600">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Optimizing Edge Node Deployment</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-bold mt-0.5 mr-3">1</span>
                    <p>Place nodes close to end-users to minimize latency. Use the latency map to identify hotspots.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-bold mt-0.5 mr-3">2</span>
                    <p>Implement intelligent load balancing policies using ESA to distribute traffic dynamically.</p>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-xs font-bold mt-0.5 mr-3">3</span>
                    <p>Utilize containerization (Docker/Kubernetes) on ENS instances for rapid deployment and scaling.</p>
                  </li>
                </ul>
              </div>
            )}
             {type === ViewState.TOOL_ENA_SPEED && (
               <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-48 h-48 rounded-full border-8 border-gray-100 border-t-blue-500 animate-spin flex items-center justify-center mb-8">
                     {/* Speedometer visual */}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Testing Network Latency...</h3>
                  <p className="text-gray-500 mt-2">Pinging nearest ENA POPs</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};