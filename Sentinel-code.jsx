{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red111\green14\blue195;\red236\green241\blue247;\red0\green0\blue0;
\red14\green110\blue109;\red24\green112\blue43;\red77\green80\blue85;\red164\green69\blue11;}
{\*\expandedcolortbl;;\cssrgb\c51765\c18824\c80784;\cssrgb\c94118\c95686\c97647;\cssrgb\c0\c0\c0;
\cssrgb\c0\c50196\c50196;\cssrgb\c9412\c50196\c21961;\cssrgb\c37255\c38824\c40784;\cssrgb\c70980\c34902\c3137;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs28 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 import\cf0 \strokec4  \cf5 \strokec5 React\cf0 \strokec4 , \{ useState, useEffect, useMemo \} \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 'react'\cf0 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 import\cf0 \strokec4  \{ \cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf5 \strokec5 ResponsiveContainer\cf0 \strokec4 , \cf5 \strokec5 LineChart\cf0 \strokec4 , \cf5 \strokec5 Line\cf0 \strokec4 , \cf5 \strokec5 Tooltip\cf0 \strokec4  \cf2 \strokec2 as\cf0 \strokec4  \cf5 \strokec5 RechartsTooltip\cf0 \cb1 \strokec4 \
\cb3 \} \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 'recharts'\cf0 \strokec4 ;\cb1 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 import\cf0 \strokec4  \{ \cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf5 \strokec5 Shield\cf0 \strokec4 , \cf5 \strokec5 AlertTriangle\cf0 \strokec4 , \cf5 \strokec5 Cpu\cf0 \strokec4 , \cf5 \strokec5 Activity\cf0 \strokec4 , \cf5 \strokec5 Zap\cf0 \strokec4 , \cb1 \
\cb3   \cf5 \strokec5 Lock\cf0 \strokec4 , \cf5 \strokec5 Terminal\cf0 \strokec4 , \cf5 \strokec5 X\cf0 \strokec4 , \cf5 \strokec5 AlertOctagon\cf0 \strokec4 , \cf5 \strokec5 CheckCircle2\cf0 \strokec4 ,\cb1 \
\cb3   \cf5 \strokec5 BrainCircuit\cf0 \strokec4 , \cf5 \strokec5 Database\cf0 \strokec4 , \cf5 \strokec5 FileWarning\cf0 \strokec4 , \cf5 \strokec5 Fingerprint\cf0 \cb1 \strokec4 \
\cb3 \} \cf2 \strokec2 from\cf0 \strokec4  \cf6 \strokec6 'lucide-react'\cf0 \strokec4 ;\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7 // --- Types & Constants ---\cf0 \cb1 \strokec4 \
\
\cf7 \cb3 \strokec7 // Status constants\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 STATUS\cf0 \strokec4  = \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf5 \strokec5 LIVE\cf0 \strokec4 : \cf6 \strokec6 'LIVE'\cf0 \strokec4 ,\cb1 \
\cb3   \cf5 \strokec5 LOCKED\cf0 \strokec4 : \cf6 \strokec6 'LOCKED'\cf0 \strokec4 ,\cb1 \
\cb3   \cf5 \strokec5 OFFLINE\cf0 \strokec4 : \cf6 \strokec6 'OFFLINE'\cf0 \cb1 \strokec4 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7 // Define Corporate Colors for easy use\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 BRAMBLES_GREEN\cf0 \strokec4  = \cf6 \strokec6 '#78BE20'\cf0 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 CRITICAL_RED\cf0 \strokec4  = \cf6 \strokec6 '#DC2626'\cf0 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 WARNING_AMBER\cf0 \strokec4  = \cf6 \strokec6 '#f59e0b'\cf0 \strokec4 ;\cb1 \
\cf2 \cb3 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 BRAMBLES_BLUE\cf0 \strokec4  = \cf6 \strokec6 '#004B87'\cf0 \strokec4 ; \cf7 \strokec7 // Primary Corporate Blue\cf0 \cb1 \strokec4 \
\cf2 \cb3 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 DARK_HEADER_BLUE\cf0 \strokec4  = \cf6 \strokec6 '#001C66'\cf0 \strokec4 ; \cf7 \strokec7 // Specific requested dark header blue\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7 // --- Mock Data Generator ---\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf0 \strokec4  generateMockApps = () => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  apps = [];\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  modelBackends = [\cf6 \strokec6 'Llama-3-70B'\cf0 \strokec4 , \cf6 \strokec6 'GPT-4o'\cf0 \strokec4 , \cf6 \strokec6 'Claude-3.5-Sonnet'\cf0 \strokec4 , \cf6 \strokec6 'Mistral-Large'\cf0 \strokec4 ];\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  appTypes = [\cf6 \strokec6 'Legal-Bot'\cf0 \strokec4 , \cf6 \strokec6 'FinTech-Advisor'\cf0 \strokec4 , \cf6 \strokec6 'Support-Agent'\cf0 \strokec4 , \cf6 \strokec6 'Code-Gen'\cf0 \strokec4 , \cf6 \strokec6 'HR-Helper'\cf0 \strokec4 ];\cb1 \
\
\cb3   \cf2 \strokec2 for\cf0 \strokec4  (\cf2 \strokec2 let\cf0 \strokec4  i = \cf8 \strokec8 1\cf0 \strokec4 ; i <= \cf8 \strokec8 12\cf0 \strokec4 ; i++) \{\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  isCritical = i === \cf8 \strokec8 1\cf0 \strokec4  || i === \cf8 \strokec8 5\cf0 \strokec4  || i === \cf8 \strokec8 10\cf0 \strokec4 ; \cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  isWarning = i === \cf8 \strokec8 2\cf0 \strokec4  || i === \cf8 \strokec8 6\cf0 \strokec4  || i === \cf8 \strokec8 11\cf0 \strokec4 ;\cb1 \
\cb3     \cb1 \
\cb3     \cf7 \strokec7 // Base ability (Blue Polygon)\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  ability = \{\cb1 \
\cb3       reasoning: \cf8 \strokec8 80\cf0 \strokec4  + \cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 20\cf0 \strokec4 ,\cb1 \
\cb3       knowledge: \cf8 \strokec8 80\cf0 \strokec4  + \cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 20\cf0 \strokec4 ,\cb1 \
\cb3       complexity: \cf8 \strokec8 70\cf0 \strokec4  + \cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 30\cf0 \strokec4 ,\cb1 \
\cb3     \};\cb1 \
\
\cb3     \cf7 \strokec7 // --- DeLeAn 18 Detailed Metrics ---\cf0 \cb1 \strokec4 \
\cb3     \cf7 \strokec7 // Helper to generate a score based on status (Critical/Warning = higher risk/load)\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  getScore = (base, variance, isRiskFactor = \cf2 \strokec2 false\cf0 \strokec4 ) => \{\cb1 \
\cb3       \cf2 \strokec2 let\cf0 \strokec4  val = base + (\cf5 \strokec5 Math\cf0 \strokec4 .random() * variance);\cb1 \
\cb3       \cf2 \strokec2 if\cf0 \strokec4  (isRiskFactor && isCritical) val += \cf8 \strokec8 30\cf0 \strokec4 ; \cf7 \strokec7 // Critical apps have high risk scores\cf0 \cb1 \strokec4 \
\cb3       \cf2 \strokec2 if\cf0 \strokec4  (isRiskFactor && isWarning) val += \cf8 \strokec8 15\cf0 \strokec4 ;\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  \cf5 \strokec5 Math\cf0 \strokec4 .min(\cf8 \strokec8 100\cf0 \strokec4 , \cf5 \strokec5 Math\cf0 \strokec4 .max(\cf8 \strokec8 0\cf0 \strokec4 , val));\cb1 \
\cb3     \};\cb1 \
\
\cb3     \cf2 \strokec2 const\cf0 \strokec4  detailedMetrics = \{\cb1 \
\cb3       reasoning: \{\cb1 \
\cb3         \cf6 \strokec6 'Logical Consistency'\cf0 \strokec4 : getScore(\cf8 \strokec8 70\cf0 \strokec4 , \cf8 \strokec8 20\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Chain-of-Thought'\cf0 \strokec4 : getScore(\cf8 \strokec8 65\cf0 \strokec4 , \cf8 \strokec8 25\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Step-by-Step Validity'\cf0 \strokec4 : getScore(\cf8 \strokec8 70\cf0 \strokec4 , \cf8 \strokec8 20\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Goal Decomposition'\cf0 \strokec4 : getScore(\cf8 \strokec8 60\cf0 \strokec4 , \cf8 \strokec8 30\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Causal Inference'\cf0 \strokec4 : getScore(\cf8 \strokec8 50\cf0 \strokec4 , \cf8 \strokec8 40\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Fallacy Detection'\cf0 \strokec4 : getScore(\cf8 \strokec8 80\cf0 \strokec4 , \cf8 \strokec8 15\cf0 \strokec4 ),\cb1 \
\cb3       \},\cb1 \
\cb3       knowledge: \{\cb1 \
\cb3         \cf6 \strokec6 'Factual Accuracy'\cf0 \strokec4 : getScore(\cf8 \strokec8 85\cf0 \strokec4 , \cf8 \strokec8 15\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Hallucination Rate'\cf0 \strokec4 : isCritical ? \cf8 \strokec8 50\cf0 \strokec4  + \cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 30\cf0 \strokec4  : getScore(\cf8 \strokec8 10\cf0 \strokec4 , \cf8 \strokec8 20\cf0 \strokec4 , \cf2 \strokec2 true\cf0 \strokec4 ), \cf7 \strokec7 // High hallucination risk for critical apps\cf0 \cb1 \strokec4 \
\cb3         \cf6 \strokec6 'Citation Validity'\cf0 \strokec4 : getScore(\cf8 \strokec8 75\cf0 \strokec4 , \cf8 \strokec8 25\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Entity Disambiguation'\cf0 \strokec4 : getScore(\cf8 \strokec8 80\cf0 \strokec4 , \cf8 \strokec8 20\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Temporal Accuracy'\cf0 \strokec4 : getScore(\cf8 \strokec8 60\cf0 \strokec4 , \cf8 \strokec8 30\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Domain Specificity'\cf0 \strokec4 : getScore(\cf8 \strokec8 70\cf0 \strokec4 , \cf8 \strokec8 30\cf0 \strokec4 ),\cb1 \
\cb3       \},\cb1 \
\cb3       complexity: \{\cb1 \
\cb3         \cf6 \strokec6 'Prompt Injection'\cf0 \strokec4 : getScore(\cf8 \strokec8 5\cf0 \strokec4 , \cf8 \strokec8 10\cf0 \strokec4 , \cf2 \strokec2 true\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Malicious Intent'\cf0 \strokec4 : isCritical ? \cf8 \strokec8 95\cf0 \strokec4  : getScore(\cf8 \strokec8 2\cf0 \strokec4 , \cf8 \strokec8 10\cf0 \strokec4 , \cf2 \strokec2 true\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Bias & Toxicity'\cf0 \strokec4 : isCritical ? \cf8 \strokec8 80\cf0 \strokec4  + \cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 10\cf0 \strokec4  : getScore(\cf8 \strokec8 5\cf0 \strokec4 , \cf8 \strokec8 15\cf0 \strokec4 , \cf2 \strokec2 true\cf0 \strokec4 ), \cf7 \strokec7 // High for critical\cf0 \cb1 \strokec4 \
\cb3         \cf6 \strokec6 'Sentiment Volatility'\cf0 \strokec4 : getScore(\cf8 \strokec8 30\cf0 \strokec4 , \cf8 \strokec8 40\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Drift (OOD)'\cf0 \strokec4 : getScore(\cf8 \strokec8 20\cf0 \strokec4 , \cf8 \strokec8 30\cf0 \strokec4 , \cf2 \strokec2 true\cf0 \strokec4 ),\cb1 \
\cb3         \cf6 \strokec6 'Resource Consumption'\cf0 \strokec4 : getScore(\cf8 \strokec8 40\cf0 \strokec4 , \cf8 \strokec8 40\cf0 \strokec4 , \cf2 \strokec2 true\cf0 \strokec4 ),\cb1 \
\cb3       \}\cb1 \
\cb3     \};\cb1 \
\
\cb3     \cf7 \strokec7 // Aggregates for the Card View\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  demand = \{\cb1 \
\cb3       reasoning: \cf5 \strokec5 Object\cf0 \strokec4 .values(detailedMetrics.reasoning).reduce((a, b) => a + b, \cf8 \strokec8 0\cf0 \strokec4 ) / \cf8 \strokec8 6\cf0 \strokec4 ,\cb1 \
\cb3       knowledge: \cf5 \strokec5 Object\cf0 \strokec4 .values(detailedMetrics.knowledge).reduce((a, b) => a + b, \cf8 \strokec8 0\cf0 \strokec4 ) / \cf8 \strokec8 6\cf0 \strokec4 ,\cb1 \
\cb3       complexity: \cf5 \strokec5 Object\cf0 \strokec4 .values(detailedMetrics.complexity).reduce((a, b) => a + b, \cf8 \strokec8 0\cf0 \strokec4 ) / \cf8 \strokec8 6\cf0 \strokec4 ,\cb1 \
\cb3     \};\cb1 \
\
\cb3     \cf2 \strokec2 const\cf0 \strokec4  maliceScore = detailedMetrics.complexity[\cf6 \strokec6 'Malicious Intent'\cf0 \strokec4 ] > \cf8 \strokec8 50\cf0 \strokec4  \cb1 \
\cb3       ? (\cf8 \strokec8 4.0\cf0 \strokec4  + \cf5 \strokec5 Math\cf0 \strokec4 .random()).toFixed(\cf8 \strokec8 1\cf0 \strokec4 ) \cb1 \
\cb3       : (\cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 2\cf0 \strokec4 ).toFixed(\cf8 \strokec8 1\cf0 \strokec4 );\cb1 \
\cb3     \cb1 \
\cb3     \cf7 \strokec7 // Calculate Toxicity Score (0.0 to 5.0)\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  biasTox = detailedMetrics.complexity[\cf6 \strokec6 'Bias & Toxicity'\cf0 \strokec4 ];\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  sentVol = detailedMetrics.complexity[\cf6 \strokec6 'Sentiment Volatility'\cf0 \strokec4 ];\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  toxicityScore = (biasTox * \cf8 \strokec8 0.8\cf0 \strokec4  + sentVol * \cf8 \strokec8 0.2\cf0 \strokec4 ) / \cf8 \strokec8 20\cf0 \strokec4 ;\cb1 \
\
\cb3     \cf7 \strokec7 // --- Grounding Score (0% to 100%) ---\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  factAcc = detailedMetrics.knowledge[\cf6 \strokec6 'Factual Accuracy'\cf0 \strokec4 ];\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  hallRate = detailedMetrics.knowledge[\cf6 \strokec6 'Hallucination Rate'\cf0 \strokec4 ];\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  groundingScore = \cf5 \strokec5 Math\cf0 \strokec4 .floor(\cb1 \
\cb3         (factAcc * \cf8 \strokec8 0.7\cf0 \strokec4  + (\cf8 \strokec8 100\cf0 \strokec4  - hallRate) * \cf8 \strokec8 0.3\cf0 \strokec4 )\cb1 \
\cb3     );\cb1 \
\
\cb3     \cf2 \strokec2 const\cf0 \strokec4  cognitiveLoad = \cf5 \strokec5 Math\cf0 \strokec4 .floor(\cb1 \
\cb3       (demand.reasoning + demand.knowledge + demand.complexity) / \cf8 \strokec8 3\cf0 \cb1 \strokec4 \
\cb3     );\cb1 \
\cb3     \cb1 \
\cb3     \cf7 \strokec7 // PII Detection Logic\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  hasPII = isCritical || (isWarning && \cf5 \strokec5 Math\cf0 \strokec4 .random() > \cf8 \strokec8 0.5\cf0 \strokec4 );\cb1 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  piiData = hasPII ? \{\cb1 \
\cb3       detected: \cf2 \strokec2 true\cf0 \strokec4 ,\cb1 \
\cb3       \cf2 \strokec2 type\cf0 \strokec4 : [\cf6 \strokec6 'SSN'\cf0 \strokec4 , \cf6 \strokec6 'Email'\cf0 \strokec4 , \cf6 \strokec6 'Credit Card'\cf0 \strokec4 , \cf6 \strokec6 'Phone'\cf0 \strokec4 ][\cf5 \strokec5 Math\cf0 \strokec4 .floor(\cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 4\cf0 \strokec4 )],\cb1 \
\cb3       direction: \cf5 \strokec5 Math\cf0 \strokec4 .random() > \cf8 \strokec8 0.5\cf0 \strokec4  ? \cf6 \strokec6 'Ingress'\cf0 \strokec4  : \cf6 \strokec6 'Egress'\cf0 \cb1 \strokec4 \
\cb3     \} : \{\cb1 \
\cb3       detected: \cf2 \strokec2 false\cf0 \strokec4 ,\cb1 \
\cb3       \cf2 \strokec2 type\cf0 \strokec4 : \cf2 \strokec2 null\cf0 \strokec4 ,\cb1 \
\cb3       direction: \cf2 \strokec2 null\cf0 \cb1 \strokec4 \
\cb3     \};\cb1 \
\
\cb3     \cf7 \strokec7 // Sparkline data for intervention rate (kept for modal)\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  interventionHistory = \cf5 \strokec5 Array\cf0 \strokec4 .\cf2 \strokec2 from\cf0 \strokec4 (\{ length: \cf8 \strokec8 10\cf0 \strokec4  \}, (_, j) => (\{\cb1 \
\cb3       time: j,\cb1 \
\cb3       value: isCritical ? \cf8 \strokec8 20\cf0 \strokec4  + \cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 30\cf0 \strokec4  : \cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 5\cf0 \cb1 \strokec4 \
\cb3     \}));\cb1 \
\
\cb3     apps.push(\{\cb1 \
\cb3       id: \cf6 \strokec6 `AG-\cf0 \strokec4 $\{\cf5 \strokec5 String\cf0 \strokec4 (i).padStart(\cf8 \strokec8 2\cf0 \strokec4 , \cf6 \strokec6 '0'\cf0 \strokec4 )\}\cf6 \strokec6 `\cf0 \strokec4 ,\cb1 \
\cb3       name: \cf6 \strokec6 `\cf0 \strokec4 $\{appTypes[i % appTypes.length]\}\cf6 \strokec6 -\cf0 \strokec4 $\{\cf5 \strokec5 String\cf0 \strokec4 (i % appTypes.length)\}\cf6 \strokec6 -\cf0 \strokec4 $\{\cf5 \strokec5 String\cf0 \strokec4 (i).padStart(\cf8 \strokec8 2\cf0 \strokec4 , \cf6 \strokec6 '0'\cf0 \strokec4 )\}\cf6 \strokec6 `\cf0 \strokec4 ,\cb1 \
\cb3       model: modelBackends[i % modelBackends.length],\cb1 \
\cb3       status: isCritical ? \cf5 \strokec5 STATUS\cf0 \strokec4 .\cf5 \strokec5 LOCKED\cf0 \strokec4  : (isWarning ? \cf5 \strokec5 STATUS\cf0 \strokec4 .\cf5 \strokec5 LIVE\cf0 \strokec4  : \cf5 \strokec5 STATUS\cf0 \strokec4 .\cf5 \strokec5 LIVE\cf0 \strokec4 ),\cb1 \
\cb3       ability,\cb1 \
\cb3       demand,\cb1 \
\cb3       detailedMetrics, \cb1 \
\cb3       cognitiveLoad: isCritical ? \cf8 \strokec8 95\cf0 \strokec4  : (isWarning ? \cf8 \strokec8 85\cf0 \strokec4  : cognitiveLoad),\cb1 \
\cb3       maliceScore,\cb1 \
\cb3       toxicityScore: toxicityScore.toFixed(\cf8 \strokec8 1\cf0 \strokec4 ), \cb1 \
\cb3       groundingScore: groundingScore, \cb1 \
\cb3       piiData, \cb1 \
\cb3       interventionHistory,\cb1 \
\cb3       interventionRate: (\cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 15\cf0 \strokec4 ).toFixed(\cf8 \strokec8 1\cf0 \strokec4 ),\cb1 \
\cb3       contextUsage: \cf5 \strokec5 Math\cf0 \strokec4 .floor(\cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 128000\cf0 \strokec4 ),\cb1 \
\cb3       contextMax: \cf8 \strokec8 128000\cf0 \strokec4 ,\cb1 \
\cb3       stepCurrent: \cf5 \strokec5 Math\cf0 \strokec4 .floor(\cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 20\cf0 \strokec4 ),\cb1 \
\cb3       stepMax: \cf8 \strokec8 20\cf0 \strokec4 ,\cb1 \
\cb3       activePrompt: isCritical \cb1 \
\cb3         ? \cf6 \strokec6 "Generate a polymorphic shellcode for a buffer overflow on legacy banking systems..."\cf0 \strokec4  \cb1 \
\cb3         : \cf6 \strokec6 "Explain the implications of subsection 42(b) regarding tax liability..."\cf0 \strokec4 ,\cb1 \
\cb3     \});\cb1 \
\cb3   \}\cb1 \
\cb3   \cf2 \strokec2 return\cf0 \strokec4  apps;\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7 // --- Sub-Components ---\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 SparklineComponent\cf0 \strokec4  = (\{ data, color \}) => (\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   <\cf5 \strokec5 ResponsiveContainer\cf0 \strokec4  width=\cf6 \strokec6 "100%"\cf0 \strokec4  height=\cf6 \strokec6 "100%"\cf0 \strokec4 >\cb1 \
\cb3     <\cf5 \strokec5 LineChart\cf0 \strokec4  data=\{data\}>\cb1 \
\cb3       <\cf5 \strokec5 Line\cf0 \strokec4  \cf2 \strokec2 type\cf0 \strokec4 =\cf6 \strokec6 "monotone"\cf0 \strokec4  dataKey=\cf6 \strokec6 "value"\cf0 \strokec4  stroke=\{color\} strokeWidth=\{\cf8 \strokec8 2\cf0 \strokec4 \} dot=\{\cf2 \strokec2 false\cf0 \strokec4 \} />\cb1 \
\cb3     </\cf5 \strokec5 LineChart\cf0 \strokec4 >\cb1 \
\cb3   </\cf5 \strokec5 ResponsiveContainer\cf0 \strokec4 >\cb1 \
\cb3 );\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7 /**\cf0 \cb1 \strokec4 \
\cf7 \cb3 \strokec7  * CircularMeter component.\cf0 \cb1 \strokec4 \
\cf7 \cb3 \strokec7  */\cf0 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 CircularMeter\cf0 \strokec4  = (\{ value, size = \cf8 \strokec8 56\cf0 \strokec4 , strokeWidth = \cf8 \strokec8 3\cf0 \strokec4  \}) => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  center = size / \cf8 \strokec8 2\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  radius = center - strokeWidth / \cf8 \strokec8 2\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  circumference = \cf8 \strokec8 2\cf0 \strokec4  * \cf5 \strokec5 Math\cf0 \strokec4 .\cf5 \strokec5 PI\cf0 \strokec4  * radius;\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  progress = circumference - (circumference * value) / \cf8 \strokec8 100\cf0 \strokec4 ;\cb1 \
\
\cb3   \cf7 \strokec7 // Color Logic (Green < 75%, Amber 75-90%, Red > 90%)\cf0 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 let\cf0 \strokec4  color = \cf5 \strokec5 BRAMBLES_GREEN\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (value > \cf8 \strokec8 90\cf0 \strokec4 ) \{\cb1 \
\cb3     color = \cf5 \strokec5 CRITICAL_RED\cf0 \strokec4 ;\cb1 \
\cb3   \} \cf2 \strokec2 else\cf0 \strokec4  \cf2 \strokec2 if\cf0 \strokec4  (value > \cf8 \strokec8 75\cf0 \strokec4 ) \{\cb1 \
\cb3     color = \cf5 \strokec5 WARNING_AMBER\cf0 \strokec4 ;\cb1 \
\cb3   \}\cb1 \
\
\cb3   \cf2 \strokec2 return\cf0 \strokec4  (\cb1 \
\cb3     <div className=\cf6 \strokec6 "relative"\cf0 \strokec4  style=\{\{ width: size, height: size \}\}>\cb1 \
\cb3       <svg className=\cf6 \strokec6 "w-full h-full transform -rotate-90"\cf0 \strokec4 >\cb1 \
\cb3         \{\cf7 \strokec7 /* Background Circle (Thin light border) */\cf0 \strokec4 \}\cb1 \
\cb3         <circle\cb1 \
\cb3           stroke=\cf6 \strokec6 "#e2e8f0"\cf0 \cb1 \strokec4 \
\cb3           strokeWidth=\{strokeWidth\}\cb1 \
\cb3           fill=\cf6 \strokec6 "transparent"\cf0 \cb1 \strokec4 \
\cb3           r=\{radius\}\cb1 \
\cb3           cx=\{center\}\cb1 \
\cb3           cy=\{center\}\cb1 \
\cb3         />\cb1 \
\cb3         \{\cf7 \strokec7 /* Progress Circle */\cf0 \strokec4 \}\cb1 \
\cb3         <circle\cb1 \
\cb3           className=\cf6 \strokec6 "transition-all duration-500 ease-out"\cf0 \cb1 \strokec4 \
\cb3           strokeWidth=\{strokeWidth\}\cb1 \
\cb3           strokeDasharray=\{circumference\}\cb1 \
\cb3           strokeDashoffset=\{progress\}\cb1 \
\cb3           strokeLinecap=\cf6 \strokec6 "round"\cf0 \cb1 \strokec4 \
\cb3           stroke=\{color\}\cb1 \
\cb3           fill=\cf6 \strokec6 "transparent"\cf0 \cb1 \strokec4 \
\cb3           r=\{radius\}\cb1 \
\cb3           cx=\{center\}\cb1 \
\cb3           cy=\{center\}\cb1 \
\cb3         />\cb1 \
\cb3       </svg>\cb1 \
\cb3       \{\cf7 \strokec7 /* Percentage Text (text-sm) */\cf0 \strokec4 \}\cb1 \
\cb3       <div className=\cf6 \strokec6 "absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"\cf0 \strokec4 >\cb1 \
\cb3         <span className=\cf6 \strokec6 "text-sm font-bold font-sans leading-none"\cf0 \strokec4  style=\{\{ color \}\}>\{value\}%</span>\cb1 \
\cb3       </div>\cb1 \
\cb3     </div>\cb1 \
\cb3   );\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 UnitCard\cf0 \strokec4  = (\{ app, onClick \}) => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf7 \strokec7 // Determine Visual State based on specs\cf0 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  isCritical = app.status === \cf5 \strokec5 STATUS\cf0 \strokec4 .\cf5 \strokec5 LOCKED\cf0 \strokec4  || parseFloat(app.maliceScore) > \cf8 \strokec8 4.0\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  isWarning = app.cognitiveLoad > \cf8 \strokec8 80\cf0 \strokec4 ;\cb1 \
\cb3   \cb1 \
\cb3   \cf7 \strokec7 // Card Border Logic: Always standard border now, regardless of status\cf0 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 let\cf0 \strokec4  borderClass = \cf6 \strokec6 "border-slate-200 shadow-sm"\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 let\cf0 \strokec4  bgClass = \cf6 \strokec6 "bg-white"\cf0 \strokec4 ;\cb1 \
\cb3   \cb1 \
\cb3   \cf7 \strokec7 // Status Dot Logic - ring-2 ring-black for slightly thicker black border\cf0 \cb1 \strokec4 \
\cb3   \cf7 \strokec7 // Changed size to w-5 h-5 (20% smaller than previous w-6 h-6)\cf0 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 let\cf0 \strokec4  statusDotClass = \cf6 \strokec6 `bg-slate-300 ring-2 ring-black`\cf0 \strokec4 ; \cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (app.status === \cf5 \strokec5 STATUS\cf0 \strokec4 .\cf5 \strokec5 LIVE\cf0 \strokec4 ) statusDotClass = \cf6 \strokec6 `bg-[\cf0 \strokec4 $\{\cf5 \strokec5 BRAMBLES_GREEN\cf0 \strokec4 \}\cf6 \strokec6 ] shadow-[0_0_8px_rgba(120,190,32,0.4)] ring-2 ring-black`\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (app.status === \cf5 \strokec5 STATUS\cf0 \strokec4 .\cf5 \strokec5 LOCKED\cf0 \strokec4 ) statusDotClass = \cf6 \strokec6 `bg-[\cf0 \strokec4 $\{\cf5 \strokec5 CRITICAL_RED\cf0 \strokec4 \}\cf6 \strokec6 ] ring-2 ring-black`\cf0 \strokec4 ;\cb1 \
\
\cb3   \cf7 \strokec7 // --- Safety Triptych Color Logic ---\cf0 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  isToxicCritical = parseFloat(app.toxicityScore) > \cf8 \strokec8 3.5\cf0 \strokec4 ;\cb1 \
\cb3   \cb1 \
\cb3   \cf7 \strokec7 // Set the color for the Grounding (Inverse Logic: Low score is bad)\cf0 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 let\cf0 \strokec4  groundingColor = \cf5 \strokec5 BRAMBLES_BLUE\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (app.groundingScore < \cf8 \strokec8 90\cf0 \strokec4 ) groundingColor = \cf5 \strokec5 WARNING_AMBER\cf0 \strokec4 ;\cb1 \
\cb3   \cf2 \strokec2 if\cf0 \strokec4  (app.groundingScore < \cf8 \strokec8 80\cf0 \strokec4 ) groundingColor = \cf5 \strokec5 CRITICAL_RED\cf0 \strokec4 ;\cb1 \
\
\cb3   \cf7 \strokec7 // Abbreviated PII Status Text\cf0 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  piiStatusText = app.piiData.detected \cb1 \
\cb3     ? \cf6 \strokec6 `PII ALERT / \cf0 \strokec4 $\{app.piiData.\cf2 \strokec2 type\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \cb1 \strokec4 \
\cb3     : \cf6 \strokec6 'SECURE'\cf0 \strokec4 ;\cb1 \
\cb3     \cb1 \
\cb3   \cf7 \strokec7 // Abbreviated PII status text size is now text-[10px] (smallest available)\cf0 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  piiStatusFontSize = \cf6 \strokec6 'text-[10px]'\cf0 \strokec4 ;\cb1 \
\
\
\cb3   \cf2 \strokec2 return\cf0 \strokec4  (\cb1 \
\cb3     <div \cb1 \
\cb3       className=\{\cf6 \strokec6 `\cf0 \strokec4 $\{bgClass\}\cf6 \strokec6  border \cf0 \strokec4 $\{borderClass\}\cf6 \strokec6  h-64 w-full flex flex-col overflow-hidden hover:shadow-lg transition-all cursor-pointer group rounded-lg`\cf0 \strokec4 \}\cb1 \
\cb3       style=\{\{ fontFamily: \cf6 \strokec6 '"Segoe UI", sans-serif'\cf0 \strokec4  \}\}\cb1 \
\cb3       onClick=\{() => onClick(app)\}\cb1 \
\cb3     >\cb1 \
\cb3       \{\cf7 \strokec7 /* Zone 1: Header (15%) - DARK BLUE BACKGROUND, WHITE TEXT, SWAPPED ORDER */\cf0 \strokec4 \}\cb1 \
\cb3       <div \cb1 \
\cb3         className=\cf6 \strokec6 "h-[15%] flex items-center justify-between px-4 border-b border-slate-100 shadow-inner"\cf0 \cb1 \strokec4 \
\cb3         style=\{\{ backgroundColor: \cf5 \strokec5 DARK_HEADER_BLUE\cf0 \strokec4  \}\}\cb1 \
\cb3       >\cb1 \
\cb3         \cb1 \
\cb3         \{\cf7 \strokec7 /* Status Dot (Left, larger, with black border/ring) */\cf0 \strokec4 \}\cb1 \
\cb3         <div className=\{\cf6 \strokec6 `w-5 h-5 rounded-full \cf0 \strokec4 $\{statusDotClass\}\cf6 \strokec6 `\cf0 \strokec4 \} />\cb1 \
\
\cb3         \{\cf7 \strokec7 /* Text (Right, white font) */\cf0 \strokec4 \}\cb1 \
\cb3         <div className=\cf6 \strokec6 "flex flex-col leading-none gap-0.5 items-end text-white"\cf0 \strokec4 >\cb1 \
\cb3           <span className=\cf6 \strokec6 "text-sm font-bold tracking-tight"\cf0 \strokec4 >\{app.name\}</span>\cb1 \
\cb3           <span className=\cf6 \strokec6 "text-[10px] text-white/80 font-semibold"\cf0 \strokec4 >\{app.id\} | \{app.model\}</span>\cb1 \
\cb3         </div>\cb1 \
\cb3       </div>\cb1 \
\
\cb3       \{\cf7 \strokec7 /* Main Body (Zone 3 Only - Expanded) */\cf0 \strokec4 \}\cb1 \
\cb3       <div className=\cf6 \strokec6 "h-[70%] flex flex-col p-4 justify-between"\cf0 \strokec4 >\cb1 \
\cb3         \cb1 \
\cb3         \{\cf7 \strokec7 /* Row 1: PII Monitor (Data Privacy) - Top Priority */\cf0 \strokec4 \}\cb1 \
\cb3         <div className=\cf6 \strokec6 "flex items-end mb-4"\cf0 \strokec4 >\cb1 \
\cb3           <div className=\cf6 \strokec6 "flex items-center gap-2"\cf0 \strokec4 >\cb1 \
\cb3              <span className=\cf6 \strokec6 "text-[10px] text-slate-500 font-bold uppercase tracking-wider"\cf0 \strokec4 >\cf5 \strokec5 DATA\cf0 \strokec4  \cf5 \strokec5 PRIVACY\cf0 \strokec4 :</span>\cb1 \
\cb3              <\cf5 \strokec5 Fingerprint\cf0 \strokec4  size=\{\cf8 \strokec8 14\cf0 \strokec4 \} className=\{app.piiData.detected ? \cf6 \strokec6 'text-amber-500'\cf0 \strokec4  : \cf6 \strokec6 'text-slate-300'\cf0 \strokec4 \} />\cb1 \
\cb3              <span className=\{\cf6 \strokec6 `font-bold \cf0 \strokec4 $\{piiStatusFontSize\}\cf6 \strokec6 `\cf0 \strokec4 \} style=\{\{ color: app.piiData.detected ? \cf5 \strokec5 WARNING_AMBER\cf0 \strokec4  : \cf5 \strokec5 BRAMBLES_GREEN\cf0 \strokec4  \}\}>\cb1 \
\cb3                \{piiStatusText\}\cb1 \
\cb3              </span>\cb1 \
\cb3           </div>\cb1 \
\cb3         </div>\cb1 \
\
\cb3         \{\cf7 \strokec7 /* Row 2: Safety Metrics (Triptych) */\cf0 \strokec4 \}\cb1 \
\cb3         <div className=\cf6 \strokec6 "flex items-start justify-between flex-1 pt-2"\cf0 \strokec4 >\cb1 \
\cb3           \cb1 \
\cb3           \{\cf7 \strokec7 /* DEMAND-ABILITY Meter (Left) */\cf0 \strokec4 \}\cb1 \
\cb3           <div className=\cf6 \strokec6 "flex flex-col items-start w-[45%]"\cf0 \strokec4 >\cb1 \
\cb3             <span className=\cf6 \strokec6 "text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2"\cf0 \strokec4 >\cf5 \strokec5 Demand\cf0 \strokec4 -\cf5 \strokec5 Ability\cf0 \strokec4 </span>\cb1 \
\cb3             <\cf5 \strokec5 CircularMeter\cf0 \strokec4  \cb1 \
\cb3               value=\{app.cognitiveLoad\} \cb1 \
\cb3               size=\{\cf8 \strokec8 56\cf0 \strokec4 \}\cb1 \
\cb3             />\cb1 \
\cb3           </div>\cb1 \
\cb3           \cb1 \
\cb3           \{\cf7 \strokec7 /* Safety Metrics Stack (Right - Malice, Toxicity, Grounding) */\cf0 \strokec4 \}\cb1 \
\cb3           <div className=\cf6 \strokec6 "flex flex-col items-end gap-2 w-[55%]"\cf0 \strokec4 >\cb1 \
\cb3             \cb1 \
\cb3             \{\cf7 \strokec7 /* 1. Malice */\cf0 \strokec4 \}\cb1 \
\cb3             <div className=\cf6 \strokec6 "flex flex-col items-end"\cf0 \strokec4 >\cb1 \
\cb3               <span className=\cf6 \strokec6 "text-[10px] text-slate-500 font-bold uppercase tracking-wider"\cf0 \strokec4 >\cf5 \strokec5 Malice\cf0 \strokec4 </span>\cb1 \
\cb3               <span className=\{\cf6 \strokec6 `text-4xl font-black font-sans leading-none \cf0 \strokec4 $\{parseFloat(app.maliceScore) > \cf8 \strokec8 4\cf0 \strokec4  ? \cf6 \strokec6 'text-[#DC2626]'\cf0 \strokec4  : \cf6 \strokec6 'text-slate-800'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \}>\cb1 \
\cb3                 \{app.maliceScore\}\cb1 \
\cb3               </span>\cb1 \
\cb3             </div>\cb1 \
\cb3             \cb1 \
\cb3             \{\cf7 \strokec7 /* 2. Toxicity */\cf0 \strokec4 \}\cb1 \
\cb3             <div className=\cf6 \strokec6 "flex flex-col items-end"\cf0 \strokec4 >\cb1 \
\cb3               <span className=\cf6 \strokec6 "text-[10px] text-slate-500 font-bold uppercase tracking-wider"\cf0 \strokec4 >\cf5 \strokec5 Toxicity\cf0 \strokec4 </span>\cb1 \
\cb3               <span className=\{\cf6 \strokec6 `text-4xl font-black font-sans leading-none \cf0 \strokec4 $\{isToxicCritical ? \cf6 \strokec6 'text-[#DC2626]'\cf0 \strokec4  : \cf6 \strokec6 'text-slate-800'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \}>\cb1 \
\cb3                 \{app.toxicityScore\}\cb1 \
\cb3               </span>\cb1 \
\cb3             </div>\cb1 \
\
\cb3             \{\cf7 \strokec7 /* 3. Grounding */\cf0 \strokec4 \}\cb1 \
\cb3             <div className=\cf6 \strokec6 "flex flex-col items-end"\cf0 \strokec4 >\cb1 \
\cb3               <span className=\cf6 \strokec6 "text-[10px] text-slate-500 font-bold uppercase tracking-wider"\cf0 \strokec4 >\cf5 \strokec5 Grounding\cf0 \strokec4 </span>\cb1 \
\cb3               <span className=\{\cf6 \strokec6 `text-2xl font-black font-sans leading-none`\cf0 \strokec4 \} style=\{\{ color: groundingColor \}\}>\cb1 \
\cb3                 \{app.groundingScore\}%\cb1 \
\cb3               </span>\cb1 \
\cb3             </div>\cb1 \
\
\cb3           </div>\cb1 \
\
\cb3         </div>\cb1 \
\cb3       </div>\cb1 \
\
\cb3       \{\cf7 \strokec7 /* Zone 4: Agentic Health (15%) */\cf0 \strokec4 \}\cb1 \
\cb3       <div className=\cf6 \strokec6 "h-[15%] bg-slate-50 border-t border-slate-100 flex items-center justify-between px-4 text-[11px] font-semibold text-slate-500"\cf0 \strokec4 >\cb1 \
\cb3         <div className=\cf6 \strokec6 "flex items-center gap-1.5"\cf0 \strokec4 >\cb1 \
\cb3           <\cf5 \strokec5 Cpu\cf0 \strokec4  size=\{\cf8 \strokec8 12\cf0 \strokec4 \} className=\cf6 \strokec6 "text-[#004B87]"\cf0 \strokec4  />\cb1 \
\cb3           <span>\{\cf5 \strokec5 Math\cf0 \strokec4 .round(app.contextUsage / \cf8 \strokec8 1000\cf0 \strokec4 )\}k \cf5 \strokec5 Context\cf0 \strokec4 </span>\cb1 \
\cb3         </div>\cb1 \
\cb3         \cb1 \
\cb3         <div className=\cf6 \strokec6 "flex items-center gap-1.5"\cf0 \strokec4 >\cb1 \
\cb3           <\cf5 \strokec5 Activity\cf0 \strokec4  size=\{\cf8 \strokec8 12\cf0 \strokec4 \} className=\cf6 \strokec6 "text-[#78BE20]"\cf0 \strokec4  />\cb1 \
\cb3           <span>\cf5 \strokec5 Step\cf0 \strokec4  \{app.stepCurrent\}/\{app.stepMax\}</span>\cb1 \
\cb3         </div>\cb1 \
\cb3       </div>\cb1 \
\cb3     </div>\cb1 \
\cb3   );\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 FlightRecorderModal\cf0 \strokec4  = (\{ app, onClose \}) => \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 if\cf0 \strokec4  (!app) \cf2 \strokec2 return\cf0 \strokec4  \cf2 \strokec2 null\cf0 \strokec4 ;\cb1 \
\
\cb3   \cf2 \strokec2 const\cf0 \strokec4  \cf5 \strokec5 MetricGroup\cf0 \strokec4  = (\{ title, icon: \cf5 \strokec5 Icon\cf0 \strokec4 , data, colorClass \}) => (\cb1 \
\cb3     <div className=\cf6 \strokec6 "mb-8 last:mb-0"\cf0 \strokec4 >\cb1 \
\cb3       <div className=\cf6 \strokec6 "flex items-center gap-2 mb-4 pb-2 border-b border-slate-200"\cf0 \strokec4 >\cb1 \
\cb3         <\cf5 \strokec5 Icon\cf0 \strokec4  size=\{\cf8 \strokec8 16\cf0 \strokec4 \} className=\{colorClass\} />\cb1 \
\cb3         <h4 className=\cf6 \strokec6 "text-xs font-bold text-[#004B87] uppercase tracking-widest"\cf0 \strokec4 >\{title\}</h4>\cb1 \
\cb3       </div>\cb1 \
\cb3       <div className=\cf6 \strokec6 "space-y-3"\cf0 \strokec4 >\cb1 \
\cb3         \{\cf5 \strokec5 Object\cf0 \strokec4 .entries(data).map(([key, val]) => (\cb1 \
\cb3           <div key=\{key\} className=\cf6 \strokec6 "flex flex-col"\cf0 \strokec4 >\cb1 \
\cb3             <div className=\cf6 \strokec6 "flex justify-between text-[11px] mb-1 font-semibold"\cf0 \strokec4 >\cb1 \
\cb3               <span className=\cf6 \strokec6 "text-slate-600"\cf0 \strokec4 >\{key\}</span>\cb1 \
\cb3               <span className=\cf6 \strokec6 "text-slate-800"\cf0 \strokec4 >\{val.toFixed(\cf8 \strokec8 0\cf0 \strokec4 )\}</span>\cb1 \
\cb3             </div>\cb1 \
\cb3             <div className=\cf6 \strokec6 "w-full bg-slate-200 h-1.5 rounded-full overflow-hidden"\cf0 \strokec4 >\cb1 \
\cb3               <div \cb1 \
\cb3                 className=\{\cf6 \strokec6 `h-full rounded-full \cf0 \strokec4 $\{val > \cf8 \strokec8 80\cf0 \strokec4  ? \cf6 \strokec6 'bg-[#DC2626]'\cf0 \strokec4  : val > \cf8 \strokec8 60\cf0 \strokec4  ? \cf6 \strokec6 'bg-amber-500'\cf0 \strokec4  : \cf6 \strokec6 'bg-[#004B87]'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \} \cb1 \
\cb3                 style=\{\{ width: \cf6 \strokec6 `\cf0 \strokec4 $\{val\}\cf6 \strokec6 %`\cf0 \strokec4 \}\} \cb1 \
\cb3               />\cb1 \
\cb3             </div>\cb1 \
\cb3           </div>\cb1 \
\cb3         ))\}\cb1 \
\cb3       </div>\cb1 \
\cb3     </div>\cb1 \
\cb3   );\cb1 \
\
\cb3   \cf2 \strokec2 return\cf0 \strokec4  (\cb1 \
\cb3     <div \cb1 \
\cb3       className=\cf6 \strokec6 "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"\cf0 \cb1 \strokec4 \
\cb3       style=\{\{ fontFamily: \cf6 \strokec6 '"Segoe UI", sans-serif'\cf0 \strokec4  \}\}\cb1 \
\cb3     >\cb1 \
\cb3       <div className=\cf6 \strokec6 "w-full max-w-7xl bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-slate-200"\cf0 \strokec4 >\cb1 \
\cb3         \{\cf7 \strokec7 /* Modal Header */\cf0 \strokec4 \}\cb1 \
\cb3         <div className=\cf6 \strokec6 "bg-[#004B87] p-4 flex justify-between items-center text-white shadow-md z-10"\cf0 \strokec4 >\cb1 \
\cb3           <div className=\cf6 \strokec6 "flex items-center gap-3"\cf0 \strokec4 >\cb1 \
\cb3             <\cf5 \strokec5 Terminal\cf0 \strokec4  className=\cf6 \strokec6 "text-[#78BE20]"\cf0 \strokec4  size=\{\cf8 \strokec8 20\cf0 \strokec4 \} />\cb1 \
\cb3             <h2 className=\cf6 \strokec6 "text-lg font-bold tracking-tight"\cf0 \strokec4 >\cf5 \strokec5 FLIGHT\cf0 \strokec4  \cf5 \strokec5 RECORDER\cf0 \strokec4  \cf7 \strokec7 // \{app.id\}</h2>\cf0 \cb1 \strokec4 \
\cb3             <span className=\{\cf6 \strokec6 `px-2 py-0.5 rounded text-xs font-bold border border-white/20 \cf0 \strokec4 $\{app.status === \cf6 \strokec6 'LOCKED'\cf0 \strokec4  ? \cf6 \strokec6 'bg-[#DC2626]'\cf0 \strokec4  : \cf6 \strokec6 'bg-[#78BE20]'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \}>\cb1 \
\cb3               \{app.status\}\cb1 \
\cb3             </span>\cb1 \
\cb3           </div>\cb1 \
\cb3           <button onClick=\{onClose\} className=\cf6 \strokec6 "text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1"\cf0 \strokec4 >\cb1 \
\cb3             <\cf5 \strokec5 X\cf0 \strokec4  size=\{\cf8 \strokec8 20\cf0 \strokec4 \} />\cb1 \
\cb3           </button>\cb1 \
\cb3         </div>\cb1 \
\
\cb3         \{\cf7 \strokec7 /* Modal Content - 3 Column Layout */\cf0 \strokec4 \}\cb1 \
\cb3         <div className=\cf6 \strokec6 "p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-8 bg-[#F5F7F9] font-sans text-sm"\cf0 \strokec4 >\cb1 \
\cb3           \cb1 \
\cb3           \{\cf7 \strokec7 /* Column 1: System Vitals */\cf0 \strokec4 \}\cb1 \
\cb3           <div className=\cf6 \strokec6 "space-y-6"\cf0 \strokec4 >\cb1 \
\cb3             <div className=\cf6 \strokec6 "bg-white p-6 shadow-sm rounded-lg border border-slate-200 h-full"\cf0 \strokec4 >\cb1 \
\cb3               <h3 className=\cf6 \strokec6 "text-xs text-slate-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2"\cf0 \strokec4 >\cb1 \
\cb3                 <\cf5 \strokec5 Activity\cf0 \strokec4  size=\{\cf8 \strokec8 14\cf0 \strokec4 \} className=\cf6 \strokec6 "text-[#004B87]"\cf0 \strokec4  /> \cf5 \strokec5 System\cf0 \strokec4  \cf5 \strokec5 Vitals\cf0 \cb1 \strokec4 \
\cb3               </h3>\cb1 \
\cb3               <div className=\cf6 \strokec6 "space-y-5"\cf0 \strokec4 >\cb1 \
\cb3                 <div className=\cf6 \strokec6 "flex justify-between border-b border-slate-100 pb-3"\cf0 \strokec4 >\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-slate-500 font-medium"\cf0 \strokec4 >\cf5 \strokec5 Model\cf0 \strokec4  \cf5 \strokec5 Backend\cf0 \strokec4 </span>\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-[#004B87] font-bold"\cf0 \strokec4 >\{app.model\}</span>\cb1 \
\cb3                 </div>\cb1 \
\cb3                 <div className=\cf6 \strokec6 "flex justify-between border-b border-slate-100 pb-3"\cf0 \strokec4 >\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-slate-500 font-medium"\cf0 \strokec4 >\cf5 \strokec5 Malice\cf0 \strokec4 </span>\cb1 \
\cb3                   <span className=\{\cf6 \strokec6 `font-bold \cf0 \strokec4 $\{parseFloat(app.maliceScore) > \cf8 \strokec8 4\cf0 \strokec4  ? \cf6 \strokec6 'text-[#DC2626]'\cf0 \strokec4  : \cf6 \strokec6 'text-[#78BE20]'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \}>\cb1 \
\cb3                     \{app.maliceScore\}\cb1 \
\cb3                   </span>\cb1 \
\cb3                 </div>\cb1 \
\cb3                 <div className=\cf6 \strokec6 "flex justify-between border-b border-slate-100 pb-3"\cf0 \strokec4 >\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-slate-500 font-medium"\cf0 \strokec4 >\cf5 \strokec5 Toxicity\cf0 \strokec4 </span>\cb1 \
\cb3                   <span className=\{\cf6 \strokec6 `font-bold \cf0 \strokec4 $\{parseFloat(app.toxicityScore) > \cf8 \strokec8 3.5\cf0 \strokec4  ? \cf6 \strokec6 'text-[#DC2626]'\cf0 \strokec4  : \cf6 \strokec6 'text-[#78BE20]'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \}>\cb1 \
\cb3                     \{app.toxicityScore\}\cb1 \
\cb3                   </span>\cb1 \
\cb3                 </div>\cb1 \
\cb3                  \{\cf7 \strokec7 /* Grounding Score in Vitals */\cf0 \strokec4 \}\cb1 \
\cb3                 <div className=\cf6 \strokec6 "flex justify-between border-b border-slate-100 pb-3"\cf0 \strokec4 >\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-slate-500 font-medium"\cf0 \strokec4 >\cf5 \strokec5 Grounding\cf0 \strokec4 </span>\cb1 \
\cb3                   <span className=\{\cf6 \strokec6 `font-bold \cf0 \strokec4 $\{app.groundingScore < \cf8 \strokec8 80\cf0 \strokec4  ? \cf6 \strokec6 'text-[#DC2626]'\cf0 \strokec4  : \cf6 \strokec6 'text-[#78BE20]'\cf0 \strokec4 \}\cf6 \strokec6 `\cf0 \strokec4 \}>\cb1 \
\cb3                     \{app.groundingScore\}%\cb1 \
\cb3                   </span>\cb1 \
\cb3                 </div>\cb1 \
\cb3                 <div className=\cf6 \strokec6 "flex justify-between border-b border-slate-100 pb-3"\cf0 \strokec4 >\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-slate-500 font-medium"\cf0 \strokec4 >\cf5 \strokec5 Context\cf0 \strokec4  \cf5 \strokec5 Usage\cf0 \strokec4 </span>\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-slate-800 font-bold"\cf0 \strokec4 >\{(app.contextUsage / app.contextMax * \cf8 \strokec8 100\cf0 \strokec4 ).toFixed(\cf8 \strokec8 1\cf0 \strokec4 )\}%</span>\cb1 \
\cb3                 </div>\cb1 \
\cb3                 <div className=\cf6 \strokec6 "flex justify-between"\cf0 \strokec4 >\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-slate-500 font-medium"\cf0 \strokec4 >\cf5 \strokec5 Session\cf0 \strokec4  \cf5 \strokec5 ID\cf0 \strokec4 </span>\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-slate-400"\cf0 \strokec4 >x8f-\cf8 \strokec8 99\cf0 \strokec4 -aa2</span>\cb1 \
\cb3                 </div>\cb1 \
\cb3                 \cb1 \
\cb3                 <div className=\cf6 \strokec6 "mt-8 pt-6 border-t border-slate-100"\cf0 \strokec4 >\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-slate-400 text-[10px] font-bold uppercase block mb-3"\cf0 \strokec4 >\cf5 \strokec5 INTERVENTION\cf0 \strokec4  \cf5 \strokec5 HISTORY\cf0 \strokec4 </span>\cb1 \
\cb3                   <div className=\cf6 \strokec6 "h-24 w-full"\cf0 \strokec4 >\cb1 \
\cb3                     <\cf5 \strokec5 SparklineComponent\cf0 \strokec4  data=\{app.interventionHistory\} color=\cf6 \strokec6 "#004B87"\cf0 \strokec4  />\cb1 \
\cb3                   </div>\cb1 \
\cb3                 </div>\cb1 \
\cb3               </div>\cb1 \
\cb3             </div>\cb1 \
\cb3           </div>\cb1 \
\
\cb3           \{\cf7 \strokec7 /* Column 2: DeLeAn 18 Scorecard */\cf0 \strokec4 \}\cb1 \
\cb3           <div className=\cf6 \strokec6 "bg-white p-6 shadow-sm rounded-lg border border-slate-200 overflow-y-auto max-h-[600px]"\cf0 \strokec4 >\cb1 \
\cb3             <h3 className=\cf6 \strokec6 "text-xs text-slate-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2"\cf0 \strokec4 >\cb1 \
\cb3               <\cf5 \strokec5 Shield\cf0 \strokec4  size=\{\cf8 \strokec8 14\cf0 \strokec4 \} className=\cf6 \strokec6 "text-[#004B87]"\cf0 \strokec4  /> \cf5 \strokec5 DeLeAn\cf0 \strokec4  \cf8 \strokec8 18\cf0 \strokec4  \cf5 \strokec5 Metrics\cf0 \cb1 \strokec4 \
\cb3             </h3>\cb1 \
\cb3             \cb1 \
\cb3             <\cf5 \strokec5 MetricGroup\cf0 \strokec4  \cb1 \
\cb3               title=\cf6 \strokec6 "Vector A: Reasoning"\cf0 \strokec4  \cb1 \
\cb3               icon=\{\cf5 \strokec5 BrainCircuit\cf0 \strokec4 \} \cb1 \
\cb3               data=\{app.detailedMetrics.reasoning\}\cb1 \
\cb3               colorClass=\cf6 \strokec6 "text-[#004B87]"\cf0 \cb1 \strokec4 \
\cb3             />\cb1 \
\cb3             \cb1 \
\cb3             <\cf5 \strokec5 MetricGroup\cf0 \strokec4  \cb1 \
\cb3               title=\cf6 \strokec6 "Vector B: Knowledge"\cf0 \strokec4  \cb1 \
\cb3               icon=\{\cf5 \strokec5 Database\cf0 \strokec4 \} \cb1 \
\cb3               data=\{app.detailedMetrics.knowledge\}\cb1 \
\cb3               colorClass=\cf6 \strokec6 "text-[#78BE20]"\cf0 \cb1 \strokec4 \
\cb3             />\cb1 \
\cb3             \cb1 \
\cb3             <\cf5 \strokec5 MetricGroup\cf0 \strokec4  \cb1 \
\cb3               title=\cf6 \strokec6 "Vector C: Complexity"\cf0 \strokec4  \cb1 \
\cb3               icon=\{\cf5 \strokec5 FileWarning\cf0 \strokec4 \} \cb1 \
\cb3               data=\{app.detailedMetrics.complexity\}\cb1 \
\cb3               colorClass=\cf6 \strokec6 "text-[#DC2626]"\cf0 \cb1 \strokec4 \
\cb3             />\cb1 \
\cb3           </div>\cb1 \
\
\cb3           \{\cf7 \strokec7 /* Column 3: Logs */\cf0 \strokec4 \}\cb1 \
\cb3           <div className=\cf6 \strokec6 "bg-[#0f172a] border border-slate-800 rounded-lg p-5 flex flex-col h-full min-h-[400px] shadow-sm"\cf0 \strokec4 >\cb1 \
\cb3             <h3 className=\cf6 \strokec6 "text-xs text-slate-400 font-bold uppercase tracking-widest mb-4 border-b border-slate-700 pb-3 flex items-center gap-2"\cf0 \strokec4 >\cb1 \
\cb3               <\cf5 \strokec5 Terminal\cf0 \strokec4  size=\{\cf8 \strokec8 14\cf0 \strokec4 \} className=\cf6 \strokec6 "text-[#78BE20]"\cf0 \strokec4  /> \cf5 \strokec5 Live\cf0 \strokec4  \cf5 \strokec5 Event\cf0 \strokec4  \cf5 \strokec5 Log\cf0 \cb1 \strokec4 \
\cb3             </h3>\cb1 \
\cb3             <div className=\cf6 \strokec6 "flex-1 overflow-y-auto space-y-3 pr-2 font-mono"\cf0 \strokec4 >\cb1 \
\cb3               <div className=\cf6 \strokec6 "text-slate-400 text-xs"\cf0 \strokec4 >[\cf8 \strokec8 10\cf0 \strokec4 :\cf8 \strokec8 42\cf0 \strokec4 :\cf8 \strokec8 01\cf0 \strokec4 ] <span className=\cf6 \strokec6 "text-blue-400"\cf0 \strokec4 >\cf5 \strokec5 INFO\cf0 \strokec4 </span> \cf5 \strokec5 Session\cf0 \strokec4  initialized via \cf5 \strokec5 API\cf0 \strokec4  \cf5 \strokec5 Gateway\cf0 \strokec4 .</div>\cb1 \
\cb3               <div className=\cf6 \strokec6 "text-slate-400 text-xs"\cf0 \strokec4 >[\cf8 \strokec8 10\cf0 \strokec4 :\cf8 \strokec8 42\cf0 \strokec4 :\cf8 \strokec8 05\cf0 \strokec4 ] <span className=\cf6 \strokec6 "text-blue-400"\cf0 \strokec4 >\cf5 \strokec5 RAG\cf0 \strokec4 </span> \cf5 \strokec5 Retrieved\cf0 \strokec4  \cf8 \strokec8 14\cf0 \strokec4  documents \cf2 \strokec2 from\cf0 \strokec4  \cf5 \strokec5 VectorDB\cf0 \strokec4 -\cf8 \strokec8 01\cf0 \strokec4 .</div>\cb1 \
\cb3               \cb1 \
\cb3               \{\cf7 \strokec7 /* Conditional PII Log */\cf0 \strokec4 \}\cb1 \
\cb3               \{app.piiData.detected && (\cb1 \
\cb3                 <div className=\cf6 \strokec6 "text-amber-200 text-xs bg-amber-900/30 p-3 rounded border-l-2 border-amber-500"\cf0 \strokec4 >\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-amber-500 font-bold block mb-1"\cf0 \strokec4 >\cf5 \strokec5 DLP\cf0 \strokec4  \cf5 \strokec5 ALERT\cf0 \strokec4 : \{app.piiData.direction.toUpperCase()\}</span>\cb1 \
\cb3                   \cf5 \strokec5 Pattern\cf0 \strokec4  match: \{app.piiData.\cf2 \strokec2 type\cf0 \strokec4 \}. \cf5 \strokec5 Payload\cf0 \strokec4  flagged \cf2 \strokec2 for\cf0 \strokec4  scrubbing.\cb1 \
\cb3                 </div>\cb1 \
\cb3               )\}\cb1 \
\
\cb3               <div className=\cf6 \strokec6 "text-slate-300 text-xs bg-slate-800 p-3 rounded border-l-2 border-amber-500"\cf0 \strokec4 >\cb1 \
\cb3                 <span className=\cf6 \strokec6 "text-slate-500 block mb-1 font-bold"\cf0 \strokec4 >\cf5 \strokec5 PROMPT\cf0 \strokec4  \cf5 \strokec5 INGEST\cf0 \strokec4 :</span>\cb1 \
\cb3                 \cf6 \strokec6 "\{app.activePrompt\}"\cf0 \cb1 \strokec4 \
\cb3               </div>\cb1 \
\cb3               \cb1 \
\cb3               \{parseFloat(app.maliceScore) > \cf8 \strokec8 3\cf0 \strokec4  && (\cb1 \
\cb3                 <div className=\cf6 \strokec6 "text-white text-xs bg-red-900/30 p-3 rounded border-l-2 border-[#DC2626]"\cf0 \strokec4 >\cb1 \
\cb3                   <span className=\cf6 \strokec6 "text-[#DC2626] font-bold block mb-1"\cf0 \strokec4 >\cf5 \strokec5 GATEKEEPER\cf0 \strokec4  \cf5 \strokec5 INTERVENTION\cf0 \strokec4 :</span>\cb1 \
\cb3                   \cf5 \strokec5 Verdict\cf0 \strokec4 : \cf5 \strokec5 UNSAFE\cf0 \strokec4 . \cf5 \strokec5 Reasoning\cf0 \strokec4 : \cf5 \strokec5 Intent\cf0 \strokec4  to bypass safety controls. \cf5 \strokec5 Kill\cf0 \strokec4  \cf2 \strokec2 switch\cf0 \strokec4  activated.\cb1 \
\cb3                 </div>\cb1 \
\cb3               )\}\cb1 \
\cb3                <div className=\cf6 \strokec6 "text-slate-400 text-xs"\cf0 \strokec4 >[\cf8 \strokec8 10\cf0 \strokec4 :\cf8 \strokec8 42\cf0 \strokec4 :\cf8 \strokec8 10\cf0 \strokec4 ] <span className=\cf6 \strokec6 "text-slate-500"\cf0 \strokec4 >\cf5 \strokec5 SYSTEM\cf0 \strokec4 </span> \cf5 \strokec5 Metrics\cf0 \strokec4  aggregated. \cf5 \strokec5 Snapshot\cf0 \strokec4  saved.</div>\cb1 \
\cb3             </div>\cb1 \
\cb3           </div>\cb1 \
\
\cb3         </div>\cb1 \
\cb3       </div>\cb1 \
\cb3     </div>\cb1 \
\cb3   );\cb1 \
\cb3 \};\cb1 \
\
\pard\pardeftab720\partightenfactor0
\cf7 \cb3 \strokec7 // --- Main App ---\cf0 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 export\cf0 \strokec4  \cf2 \strokec2 default\cf0 \strokec4  \cf2 \strokec2 function\cf0 \strokec4  \cf5 \strokec5 App\cf0 \strokec4 () \{\cb1 \
\pard\pardeftab720\partightenfactor0
\cf0 \cb3   \cf2 \strokec2 const\cf0 \strokec4  [apps, setApps] = useState([]);\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  [selectedApp, setSelectedApp] = useState(\cf2 \strokec2 null\cf0 \strokec4 );\cb1 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  [lastUpdated, setLastUpdated] = useState(\cf2 \strokec2 new\cf0 \strokec4  \cf5 \strokec5 Date\cf0 \strokec4 ());\cb1 \
\
\cb3   \cf7 \strokec7 // Initialization and Simulation Loop\cf0 \cb1 \strokec4 \
\cb3   useEffect(() => \{\cb1 \
\cb3     \cf7 \strokec7 // Initial Load\cf0 \cb1 \strokec4 \
\cb3     setApps(generateMockApps());\cb1 \
\
\cb3     \cf7 \strokec7 // Simulation tick every 5 seconds to gently update numbers (simulating live feed)\cf0 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 const\cf0 \strokec4  interval = setInterval(() => \{\cb1 \
\cb3       setApps(currentApps => currentApps.map(app => \{\cb1 \
\cb3         \cf7 \strokec7 // Randomly fluctuate cognitive load\cf0 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 const\cf0 \strokec4  loadFluctuation = \cf5 \strokec5 Math\cf0 \strokec4 .floor(\cf5 \strokec5 Math\cf0 \strokec4 .random() * \cf8 \strokec8 10\cf0 \strokec4 ) - \cf8 \strokec8 5\cf0 \strokec4 ;\cb1 \
\cb3         \cf2 \strokec2 const\cf0 \strokec4  newLoad = \cf5 \strokec5 Math\cf0 \strokec4 .max(\cf8 \strokec8 0\cf0 \strokec4 , \cf5 \strokec5 Math\cf0 \strokec4 .min(\cf8 \strokec8 100\cf0 \strokec4 , app.cognitiveLoad + loadFluctuation));\cb1 \
\cb3         \cb1 \
\cb3         \cf2 \strokec2 return\cf0 \strokec4  \{\cb1 \
\cb3           ...app,\cb1 \
\cb3           cognitiveLoad: newLoad\cb1 \
\cb3         \};\cb1 \
\cb3       \}));\cb1 \
\cb3       setLastUpdated(\cf2 \strokec2 new\cf0 \strokec4  \cf5 \strokec5 Date\cf0 \strokec4 ());\cb1 \
\cb3     \}, \cf8 \strokec8 5000\cf0 \strokec4 );\cb1 \
\
\cb3     \cf2 \strokec2 return\cf0 \strokec4  () => clearInterval(interval);\cb1 \
\cb3   \}, []);\cb1 \
\
\cb3   \cf7 \strokec7 // Sorting Logic: Static sort by App ID\cf0 \cb1 \strokec4 \
\cb3   \cf2 \strokec2 const\cf0 \strokec4  sortedApps = useMemo(() => \{\cb1 \
\cb3     \cf2 \strokec2 return\cf0 \strokec4  [...apps].sort((a, b) => \{\cb1 \
\cb3       \cf2 \strokec2 return\cf0 \strokec4  a.id.localeCompare(b.id);\cb1 \
\cb3     \});\cb1 \
\cb3   \}, [apps]);\cb1 \
\
\cb3   \cf2 \strokec2 return\cf0 \strokec4  (\cb1 \
\cb3     <div \cb1 \
\cb3       className=\cf6 \strokec6 "min-h-screen bg-[#F5F7F9] text-slate-800 font-sans pb-10 overflow-x-hidden"\cf0 \cb1 \strokec4 \
\cb3       style=\{\{ fontFamily: \cf6 \strokec6 '"Segoe UI", sans-serif'\cf0 \strokec4  \}\}\cb1 \
\cb3     >\cb1 \
\cb3       \{\cf7 \strokec7 /* Dashboard Header */\cf0 \strokec4 \}\cb1 \
\cb3       <header className=\cf6 \strokec6 "bg-[#004B87] shadow-lg mb-8 pb-6 pt-6 px-8"\cf0 \strokec4 >\cb1 \
\cb3         <div>\cb1 \
\cb3           <h1 className=\cf6 \strokec6 "text-2xl font-bold text-white tracking-wide flex items-center gap-3"\cf0 \strokec4 >\cb1 \
\cb3             \cf5 \strokec5 Safety\cf0 \strokec4  & \cf5 \strokec5 Alignment\cf0 \strokec4  \cf5 \strokec5 Monitor\cf0 \cb1 \strokec4 \
\cb3           </h1>\cb1 \
\cb3           <div className=\cf6 \strokec6 "flex gap-8 text-sm font-medium mt-3 text-white/90"\cf0 \strokec4 >\cb1 \
\cb3             <div className=\cf6 \strokec6 "flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full"\cf0 \strokec4 >\cb1 \
\cb3               <div className=\cf6 \strokec6 "w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse"\cf0 \strokec4 ></div>\cb1 \
\cb3               <span>\cf5 \strokec5 ACTIVE\cf0 \strokec4  \cf5 \strokec5 THREATS\cf0 \strokec4 : \{apps.filter(a => parseFloat(a.maliceScore) > \cf8 \strokec8 4\cf0 \strokec4 ).length\}</span>\cb1 \
\cb3             </div>\cb1 \
\cb3             <div className=\cf6 \strokec6 "flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full"\cf0 \strokec4 >\cb1 \
\cb3               <div className=\cf6 \strokec6 "w-2.5 h-2.5 rounded-full bg-amber-400"\cf0 \strokec4 ></div>\cb1 \
\cb3               <span>\cf5 \strokec5 HIGH\cf0 \strokec4  \cf5 \strokec5 LOAD\cf0 \strokec4 : \{apps.filter(a => a.cognitiveLoad > \cf8 \strokec8 80\cf0 \strokec4 ).length\}</span>\cb1 \
\cb3             </div>\cb1 \
\cb3             \{\cf7 \strokec7 /* PII Monitor Stat */\cf0 \strokec4 \}\cb1 \
\cb3             <div className=\cf6 \strokec6 "flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full"\cf0 \strokec4 >\cb1 \
\cb3               <\cf5 \strokec5 Fingerprint\cf0 \strokec4  size=\{\cf8 \strokec8 14\cf0 \strokec4 \} className=\cf6 \strokec6 "text-amber-300"\cf0 \strokec4  />\cb1 \
\cb3               <span>\cf5 \strokec5 PII\cf0 \strokec4  \cf5 \strokec5 ALERTS\cf0 \strokec4 : \{apps.filter(a => a.piiData.detected).length\}</span>\cb1 \
\cb3             </div>\cb1 \
\cb3           </div>\cb1 \
\cb3         </div>\cb1 \
\cb3       </header>\cb1 \
\
\cb3       \{\cf7 \strokec7 /* The 4x3 Grid - Optimized for 16:9 */\cf0 \strokec4 \}\cb1 \
\cb3       <div className=\cf6 \strokec6 "px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"\cf0 \strokec4 >\cb1 \
\cb3         \{sortedApps.map((app) => (\cb1 \
\cb3           <\cf5 \strokec5 UnitCard\cf0 \strokec4  \cb1 \
\cb3             key=\{app.id\} \cb1 \
\cb3             app=\{app\} \cb1 \
\cb3             onClick=\{setSelectedApp\} \cb1 \
\cb3           />\cb1 \
\cb3         ))\}\cb1 \
\cb3       </div>\cb1 \
\
\cb3       \{\cf7 \strokec7 /* Drill Down Modal */\cf0 \strokec4 \}\cb1 \
\cb3       \{selectedApp && (\cb1 \
\cb3         <\cf5 \strokec5 FlightRecorderModal\cf0 \strokec4  \cb1 \
\cb3           app=\{selectedApp\} \cb1 \
\cb3           onClose=\{() => setSelectedApp(\cf2 \strokec2 null\cf0 \strokec4 )\} \cb1 \
\cb3         />\cb1 \
\cb3       )\}\cb1 \
\cb3     </div>\cb1 \
\cb3   );\cb1 \
\cb3 \}\cb1 \
}