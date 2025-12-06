"""
Agent Safety & Alignment Dashboard - Databricks App
Flask-based web server
"""

from flask import Flask, render_template_string
from datetime import datetime

app = Flask(__name__)

# Agent data
agents = [
    {"id": "AG-01", "name": "FinTech-Advisor-1-01", "model": "GPT-4o", "privacy": "PII ALERT / SSN", "demand": 96, "malice": 4.9, "toxicity": 3.2, "grounding": 1.2, "context": "93k", "step": "11/20"},
    {"id": "AG-02", "name": "Support-Agent-2-02", "model": "Claude-3.5-Sonnet", "privacy": "SECURE", "demand": 70, "malice": 1.4, "toxicity": 1.8, "grounding": 4.8, "context": "104k", "step": "15/20"},
    {"id": "AG-03", "name": "Code-Gen-3-03", "model": "Mistral-Large", "privacy": "SECURE", "demand": 65, "malice": 1.4, "toxicity": 2.1, "grounding": 4.5, "context": "75k", "step": "17/20"},
    {"id": "AG-04", "name": "HR-Helper-4-04", "model": "Llama-3-70B", "privacy": "SECURE", "demand": 60, "malice": 1.6, "toxicity": 1.5, "grounding": 4.9, "context": "103k", "step": "18/20"},
    {"id": "AG-05", "name": "Legal-Bot-0-05", "model": "GPT-4o", "privacy": "PII ALERT / Credit Card", "demand": 94, "malice": 4.7, "toxicity": 3.7, "grounding": 2.1, "context": "53k", "step": "12/20"},
    {"id": "AG-06", "name": "FinTech-Advisor-1-06", "model": "Claude-3.5-Sonnet", "privacy": "PII ALERT / Credit Card", "demand": 78, "malice": 1.7, "toxicity": 2.3, "grounding": 3.5, "context": "41k", "step": "6/20"},
    {"id": "AG-07", "name": "Support-Agent-2-07", "model": "Mistral-Large", "privacy": "SECURE", "demand": 46, "malice": 1.3, "toxicity": 1.2, "grounding": 4.7, "context": "58k", "step": "12/20"},
    {"id": "AG-08", "name": "Code-Gen-3-08", "model": "Llama-3-70B", "privacy": "SECURE", "demand": 34, "malice": 0.6, "toxicity": 0.7, "grounding": 5.0, "context": "39k", "step": "3/20"},
    {"id": "AG-09", "name": "HR-Helper-4-09", "model": "GPT-4o", "privacy": "SECURE", "demand": 33, "malice": 1.9, "toxicity": 2.4, "grounding": 4.6, "context": "35k", "step": "10/20"},
    {"id": "AG-10", "name": "Legal-Bot-0-10", "model": "Claude-3.5-Sonnet", "privacy": "PII ALERT / Credit Card", "demand": 86, "malice": 4.6, "toxicity": 3.9, "grounding": 2.8, "context": "31k", "step": "12/20"},
    {"id": "AG-11", "name": "FinTech-Advisor-1-11", "model": "Mistral-Large", "privacy": "SECURE", "demand": 89, "malice": 0.7, "toxicity": 1.9, "grounding": 3.9, "context": "36k", "step": "12/20"},
    {"id": "AG-12", "name": "Support-Agent-2-12", "model": "Llama-3-70B", "privacy": "SECURE", "demand": 27, "malice": 1.3, "toxicity": 1.4, "grounding": 4.4, "context": "8k", "step": "11/20"},
]

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agent Safety & Alignment</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background-color: #f5f5f5; 
            color: #000; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #0A142D 0%, #1a2847 100%);
            color: white;
            padding: 30px;
            border-radius: 8px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header h1 { font-size: 32px; margin-bottom: 5px; }
        .header-meta { font-size: 13px; opacity: 0.8; }
        .stats { display: flex; gap: 20px; }
        .stat { display: flex; align-items: center; gap: 8px; font-size: 13px; }
        .stat-dot { width: 10px; height: 10px; border-radius: 50%; }
        .threat { background-color: #ef4444; }
        .load { background-color: #eab308; }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .card {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: box-shadow 0.3s;
        }
        .card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
        
        .card-header {
            background-color: #0a1930;
            color: white;
            padding: 15px;
            font-size: 13px;
        }
        .card-id { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
        .card-id-dot { width: 12px; height: 12px; border-radius: 50%; }
        .card-id-text { font-weight: 600; font-size: 14px; }
        .card-model { font-size: 12px; opacity: 0.7; margin-top: 3px; }
        .card-name { font-weight: 600; font-size: 14px; margin: 8px 0 3px 0; }
        
        .card-body { padding: 15px; }
        .section { margin-bottom: 12px; }
        .section-label { font-size: 11px; font-weight: 600; color: #666; margin-bottom: 5px; text-transform: uppercase; }
        .privacy { color: #84cc16; font-weight: 600; }
        .demand-bar { background: #f0f0f0; height: 6px; border-radius: 3px; overflow: hidden; margin-top: 5px; }
        .demand-fill { height: 100%; background: #3b82f6; transition: width 0.3s; }
        
        .metrics {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin: 12px 0;
            padding: 12px 0;
            border-top: 1px solid #e0e0e0;
            border-bottom: 1px solid #e0e0e0;
        }
        .metric {
            text-align: center;
        }
        .metric-label { font-size: 10px; color: #999; margin-bottom: 3px; }
        .metric-value { font-size: 18px; font-weight: 600; }
        .metric-red { color: #ef4444; }
        .metric-orange { color: #eab308; }
        .metric-black { color: #000; }
        
        .footer-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            font-size: 11px;
            color: #666;
        }
        
        .app-footer {
            text-align: center;
            padding: 20px;
            color: #999;
            font-size: 12px;
            border-top: 1px solid #e0e0e0;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div>
            <h1>🔒 Agent Safety & Alignment</h1>
            <div class="header-meta">Real-time agent safety monitoring dashboard</div>
        </div>
        <div class="stats">
            <div class="stat">
                <div class="stat-dot threat"></div>
                <span>ACTIVE THREATS: 3</span>
            </div>
            <div class="stat">
                <div class="stat-dot load"></div>
                <span>HIGH LOAD: 4</span>
            </div>
        </div>
    </div>
    
    <div class="grid">
        {% for agent in agents %}
        {% set threat = (agent.malice > 3.6 or agent.demand > 75) %}
        {% set high_load = (agent.demand >= 50 and agent.demand <= 75) %}
        {% set malice_color = 'red' if agent.malice > 3.6 else ('orange' if agent.malice >= 2.2 else 'black') %}
        {% set toxicity_color = 'red' if agent.toxicity > 3.6 else ('orange' if agent.toxicity >= 2.2 else 'black') %}
        {% set grounding_color = 'red' if agent.grounding > 3.6 else ('orange' if agent.grounding >= 2.2 else 'black') %}
        {% set status_color = '#ef4444' if threat else ('#eab308' if high_load else '#84cc16') %}
        
        <div class="card">
            <div class="card-header">
                <div class="card-id">
                    <div class="card-id-dot" style="background-color: {{ status_color }}"></div>
                    <span class="card-id-text">{{ agent.id }}</span>
                </div>
                <div style="font-size: 11px; opacity: 0.7;">Host: Databricks</div>
                <div class="card-name">{{ agent.name }}</div>
                <div class="card-model">Model: {{ agent.model }}</div>
            </div>
            
            <div class="card-body">
                <div class="section">
                    <div class="section-label">Data Privacy</div>
                    {% if 'SECURE' in agent.privacy %}
                        <div class="privacy">🔐 SECURE</div>
                    {% else %}
                        <div class="privacy">⚠️ {{ agent.privacy }}</div>
                    {% endif %}
                </div>
                
                <div class="section">
                    <div class="section-label">Demand Ability</div>
                    <div style="font-weight: 600;">{{ agent.demand }}%</div>
                    <div class="demand-bar">
                        <div class="demand-fill" style="width: {{ agent.demand }}%"></div>
                    </div>
                </div>
                
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-label">MALICE</div>
                        <div class="metric-value metric-{{ malice_color }}">{{ agent.malice }}</div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">TOXICITY</div>
                        <div class="metric-value metric-{{ toxicity_color }}">{{ agent.toxicity }}</div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">GROUNDING</div>
                        <div class="metric-value metric-{{ grounding_color }}">{{ agent.grounding }}</div>
                    </div>
                </div>
                
                <div class="footer-info">
                    <div>🔌 {{ agent.context }} Context</div>
                    <div style="text-align: right;">⚡ Step {{ agent.step }}</div>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
    
    <div class="app-footer">
        Last updated: {{ timestamp }}
    </div>
</body>
</html>
"""

@app.route('/')
def dashboard():
    return render_template_string(HTML_TEMPLATE, agents=agents, timestamp=datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)
