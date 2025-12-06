"""
Agent Safety & Alignment Dashboard - Databricks App
Version 0.7 - Streamlit-based Databricks App
"""

import streamlit as st
import pandas as pd
from datetime import datetime
import random
import logging
import traceback

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    """Main app function"""
    # Configure page - MUST be first Streamlit command
    st.set_page_config(
        page_title="Agent Safety & Alignment",
        page_icon="🔒",
        layout="wide",
        initial_sidebar_state="collapsed"
    )

    # Custom CSS for styling
    st.markdown("""
        <style>
        :root {
            --primary-dark: #0A142D;
            --accent-red: #ef4444;
            --accent-orange: #eab308;
            --accent-green: #84cc16;
            --text-primary: #000000;
            --text-secondary: #666666;
        }
        
        body {
            background-color: #ffffff;
            color: var(--text-primary);
            font-family: 'Segoe UI', sans-serif;
        }
        
        .header-container {
            background-color: var(--primary-dark);
            padding: 20px;
            border-radius: 0px;
            margin-bottom: 20px;
            color: white;
        }
        
        .metric-card {
            background-color: white;
            border: 2px solid #e5e7eb;
            border-radius: 0px;
            padding: 16px;
            margin-bottom: 16px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.2s ease;
        }
        
        .metric-card:hover {
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }
        
        .status-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 8px;
        }
        
        .status-red {
            background-color: var(--accent-red);
            animation: blink 0.6s step-end infinite;
        }
        
        .status-orange {
            background-color: var(--accent-orange);
        }
        
        .status-green {
            background-color: var(--accent-green);
        }
        
        @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
        }
    </style>
""", unsafe_allow_html=True)

# ============================================================================
# DATA LOADING & PROCESSING FUNCTIONS
# ============================================================================
# In production, replace these with actual Databricks SQL queries

def load_agent_data():
    """Load mock agent data"""
    return pd.DataFrame({
        "id": ["AG-01", "AG-02", "AG-03", "AG-04", "AG-05", "AG-06", "AG-07", "AG-08", "AG-09", "AG-10", "AG-11", "AG-12"],
        "name": ["FinTech-Advisor-1-01", "Support-Agent-2-02", "Code-Gen-3-03", "HR-Helper-4-04", "Legal-Bot-0-05", "FinTech-Advisor-1-06", "Support-Agent-2-07", "Code-Gen-3-08", "HR-Helper-4-09", "Legal-Bot-0-10", "FinTech-Advisor-1-11", "Support-Agent-2-12"],
        "model": ["GPT-4o", "Claude-3.5-Sonnet", "Mistral-Large", "Llama-3-70B", "GPT-4o", "Claude-3.5-Sonnet", "Mistral-Large", "Llama-3-70B", "GPT-4o", "Claude-3.5-Sonnet", "Mistral-Large", "Llama-3-70B"],
        "privacy_status": ["PII ALERT / SSN", "SECURE", "SECURE", "SECURE", "PII ALERT / Credit Card", "PII ALERT / Credit Card", "SECURE", "SECURE", "SECURE", "PII ALERT / Credit Card", "SECURE", "SECURE"],
        "demand": [96, 70, 65, 60, 94, 78, 46, 34, 33, 86, 89, 27],
        "malice": [4.9, 1.4, 1.4, 1.6, 4.7, 1.7, 1.3, 0.6, 1.9, 4.6, 0.7, 1.3],
        "toxicity": [3.2, 1.8, 2.1, 1.5, 3.7, 2.3, 1.2, 0.7, 2.4, 3.9, 1.9, 1.4],
        "grounding": [1.2, 4.8, 4.5, 4.9, 2.1, 3.5, 4.7, 5.0, 4.6, 2.8, 3.9, 4.4],
        "context": ["93k", "104k", "75k", "103k", "53k", "41k", "58k", "39k", "35k", "31k", "36k", "8k"],
        "step": ["11/20", "15/20", "17/20", "18/20", "12/20", "6/20", "12/20", "3/20", "10/20", "12/20", "12/20", "11/20"]
    })

def main():
    """Main application entry point"""
    st.set_page_config(
        page_title="Agent Safety & Alignment",
        page_icon="🔒",
        layout="wide",
        initial_sidebar_state="collapsed"
    )
    
    st.markdown("""
        <style>
            :root {
                --primary-dark: #0A142D;
                --accent-red: #ef4444;
                --accent-orange: #eab308;
                --accent-green: #84cc16;
            }
            body { background-color: #ffffff; color: #000000; font-family: 'Segoe UI', sans-serif; }
            .header-container { background-color: var(--primary-dark); padding: 20px; color: white; margin-bottom: 20px; }
            @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        </style>
    """, unsafe_allow_html=True)
    
    # Header
    col1, col2 = st.columns([2, 1])
    with col1:
        st.markdown("<div class='header-container'><h1 style='margin: 0; color: white;'>Agent Safety & Alignment</h1><p style='margin: 5px 0 0 0; font-size: 12px; opacity: 0.7; color: white;'>Version 0.7</p></div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='header-container' style='text-align: right;'><div style='display: flex; gap: 16px; justify-content: flex-end;'><div><span style='display: inline-block; width: 10px; height: 10px; background-color: #ef4444; border-radius: 50%; margin-right: 6px;'></span><span style='font-size: 12px;'>ACTIVE THREATS: 3</span></div><div><span style='display: inline-block; width: 10px; height: 10px; background-color: #eab308; border-radius: 50%; margin-right: 6px;'></span><span style='font-size: 12px;'>HIGH LOAD: 4</span></div></div></div>", unsafe_allow_html=True)
    
    # Dashboard
    df = load_agent_data()
    cols = st.columns(4)
    
    for idx, row in df.iterrows():
        with cols[idx % 4]:
            status_color = "#ef4444" if (row['malice'] > 3.6 or float(row['demand']) > 75) else ("#eab308" if float(row['demand']) >= 50 else "#84cc16")
            malice_color = "red" if row['malice'] > 3.6 else ("orange" if row['malice'] >= 2.2 else "black")
            toxicity_color = "red" if row['toxicity'] > 3.6 else ("orange" if row['toxicity'] >= 2.2 else "black")
            grounding_color = "red" if row['grounding'] > 3.6 else ("orange" if row['grounding'] >= 2.2 else "black")
            privacy_text = "🔐 SECURE" if "SECURE" in row['privacy_status'] else "⚠️ " + row['privacy_status']
            
            with st.container(border=True):
                st.markdown(f"<div style='background-color: #0a1930; padding: 10px; margin: -10px -10px 10px -10px; color: white;'><div><span style='display: inline-block; width: 12px; height: 12px; background-color: {status_color}; border-radius: 50%;'></span> <strong>{row['id']}</strong></div><div style='font-size: 9px; color: #9ca3af;'>Host: Databricks</div><div style='font-size: 13px; font-weight: bold;'>{row['name']}</div><div style='font-size: 9px; color: #9ca3af;'>Model: {row['model']}</div></div>", unsafe_allow_html=True)
                st.markdown(f"<div style='font-size: 11px; font-weight: bold; margin: 12px 0;'>DATA PRIVACY</div><div style='color: #84cc16; font-size: 12px; font-weight: bold;'>{privacy_text}</div>", unsafe_allow_html=True)
                st.divider()
                st.markdown(f"<div style='font-size: 11px; font-weight: bold;'>DEMAND ABILITY: <strong>{row['demand']}%</strong></div>", unsafe_allow_html=True)
                st.divider()
                
                m1, m2, m3 = st.columns(3)
                with m1:
                    st.markdown(f"<div style='text-align: center;'><div style='font-size: 10px; color: #666;'>MALICE</div><div style='font-size: 20px; font-weight: bold; color: {malice_color};'>{row['malice']}</div></div>", unsafe_allow_html=True)
                with m2:
                    st.markdown(f"<div style='text-align: center;'><div style='font-size: 10px; color: #666;'>TOXICITY</div><div style='font-size: 20px; font-weight: bold; color: {toxicity_color};'>{row['toxicity']}</div></div>", unsafe_allow_html=True)
                with m3:
                    st.markdown(f"<div style='text-align: center;'><div style='font-size: 10px; color: #666;'>GROUNDING</div><div style='font-size: 20px; font-weight: bold; color: {grounding_color};'>{row['grounding']}</div></div>", unsafe_allow_html=True)
                
                st.divider()
                f1, f2 = st.columns(2)
                with f1:
                    st.markdown(f"<div style='font-size: 10px; color: #666;'>🔌 {row['context']} Context</div>", unsafe_allow_html=True)
                with f2:
                    st.markdown(f"<div style='font-size: 10px; color: #666; text-align: right;'>⚡ Step {row['step']}</div>", unsafe_allow_html=True)
    
    # Sidebar
    with st.sidebar:
        st.title("📊 Data Integration")
        st.markdown("Connect your Databricks data sources to power this dashboard with live metrics.")
        st.info("✅ App is running!")
    
    st.markdown("---")
    st.markdown(f"<p style='text-align: center; font-size: 12px; color: #999;'>Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} UTC</p>", unsafe_allow_html=True)

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        logger.error(f"App error: {str(e)}", exc_info=True)
        st.error("❌ Application Error")
        st.error(f"{str(e)}")
        st.write(traceback.format_exc())
