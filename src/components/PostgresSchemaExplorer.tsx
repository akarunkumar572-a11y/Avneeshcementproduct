import React, { useState } from 'react';
import {
  Database,
  Table,
  Key,
  Search,
  Copy,
  Check,
  Code,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  postgresTables,
  completePostgresDDL,
  indexingStrategyPoints,
  TableDefinition,
} from '../data/postgresSchemaData';
import { useApp } from '../context/AppContext';

export const PostgresSchemaExplorer: React.FC = () => {
  const { t } = useApp();

  const [selectedTable, setSelectedTable] = useState<TableDefinition>(postgresTables[0]);
  const [activeTab, setActiveTab] = useState<'visual' | 'indexing' | 'ddl'>('visual');
  const [copied, setCopied] = useState(false);

  const handleCopySQL = () => {
    navigator.clipboard.writeText(completePostgresDDL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
              <Database className="w-3.5 h-3.5" />
              Relational PostgreSQL Architecture
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {t.schemaTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {t.schemaSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-complete-ddl-btn"
              onClick={handleCopySQL}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-sm shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.copied : t.copySqlCode}</span>
            </button>
          </div>
        </div>

        {/* Sub-tabs: Visual Schema, Indexing Strategy, Raw DDL */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'visual'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Visual Tables & Columns
          </button>
          <button
            onClick={() => setActiveTab('indexing')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'indexing'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Search Indexing Strategy (GIN & B-Tree)
          </button>
          <button
            onClick={() => setActiveTab('ddl')}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'ddl'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Raw DDL Script
          </button>
        </div>
      </div>

      {/* View 1: Visual Tables & Columns */}
      {activeTab === 'visual' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Tables Selection List */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Database Tables
            </div>

            {postgresTables.map((table) => {
              const isSelected = selectedTable.name === table.name;

              return (
                <div
                  key={table.name}
                  onClick={() => setSelectedTable(table)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Table className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-slate-500'}`} />
                      <span className="font-mono font-bold text-sm text-slate-900">
                        {table.name}
                      </span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono">
                      {table.columns.length} cols
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {table.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Table Details & Columns Inspector */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Table Details Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-slate-900">
                      public.{selectedTable.name}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                      {selectedTable.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {selectedTable.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Key className="w-3.5 h-3.5 text-amber-500" />
                  <span>UUID Primary Key</span>
                </div>
              </div>

              {/* Columns Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-semibold text-[10px]">
                      <th className="py-2.5 px-3">Column Name</th>
                      <th className="py-2.5 px-3">Data Type</th>
                      <th className="py-2.5 px-3">Constraints & Modifiers</th>
                      <th className="py-2.5 px-3">Description & Business Logic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {selectedTable.columns.map((col) => (
                      <tr key={col.name} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-2.5 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                          {col.constraints.includes('PRIMARY KEY') && (
                            <Key className="w-3 h-3 text-amber-500 shrink-0" />
                          )}
                          <span>{col.name}</span>
                        </td>
                        <td className="py-2.5 px-3 text-purple-700 font-semibold">
                          {col.type}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                          {col.constraints || '-'}
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 font-sans text-xs">
                          {col.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Assigned Indexes */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Indexes Engineered on <code>{selectedTable.name}</code>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedTable.indices.map((idx) => (
                  <div
                    key={idx.name}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-900">{idx.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold text-[10px]">
                        {idx.type}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-purple-800 bg-white px-2 py-0.5 rounded border border-slate-200 inline-block">
                      ({idx.columns})
                    </div>
                    <p className="text-slate-600 text-[11px] pt-1">
                      {idx.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Query Box */}
            <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-amber-400">
                  <Code className="w-4 h-4" />
                  Optimized Query Execution Pattern
                </span>
                <span className="font-mono text-[10px]">EXPLAIN (ANALYZE, BUFFERS)</span>
              </div>
              <pre className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-emerald-400 overflow-x-auto border border-slate-800">
                {selectedTable.sampleQuery}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* View 2: Search Indexing Strategy */}
      {activeTab === 'indexing' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {indexingStrategyPoints.map((point, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    {point.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                    <span>Target:</span>
                    <span className="text-purple-700 font-semibold">{point.targetColumns}</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-700 font-semibold text-[11px]">
                    <span>Benchmark:</span>
                    <span>{point.perfGain}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benchmark Comparison Infographic */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold font-heading text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              Query Latency Benchmark: 2,500,000 Rows Simulated (Avanish Precast DB)
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1">
                  <span>Sequential Scan (Unindexed LIKE '%paver%'):</span>
                  <span className="font-mono text-rose-600 font-bold">485.4 ms</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full w-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1">
                  <span>Standard B-Tree Index:</span>
                  <span className="font-mono text-amber-600 font-bold">32.1 ms</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full w-[12%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1">
                  <span>Optimized GIN Full-Text Vector (search_vector):</span>
                  <span className="font-mono text-emerald-600 font-bold">1.2 ms (Sub-Millisecond)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[2%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 3: Complete DDL Script */}
      {activeTab === 'ddl' && (
        <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <span className="font-mono text-amber-400">schema.sql (PostgreSQL 15+ / 16+)</span>
            <button
              onClick={handleCopySQL}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy All'}</span>
            </button>
          </div>
          <pre className="p-4 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto max-h-[500px]">
            {completePostgresDDL}
          </pre>
        </div>
      )}

    </div>
  );
};
