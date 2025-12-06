# Sentinel Databricks Streamlit App

Rebuild of the Agent Safety & Alignment dashboard as a Databricks App powered by Streamlit.

## Files
- `app.py` – Streamlit app that renders the dashboard UI using the original card data.
- `requirements.txt` – Python dependencies for the app runtime.
- `databricks.yml` – Databricks bundle definition for deploying the Streamlit App.

## Local preview
1. Create/activate a virtual env.
2. `pip install -r requirements.txt`
3. `streamlit run app.py`

## Deploy as a Databricks App (bundle)
1. Install the Databricks CLI v0.215+ and log in (`databricks configure --token` or set `DATABRICKS_HOST` and `DATABRICKS_TOKEN`).
2. Validate the bundle: `databricks bundle validate`.
3. Deploy to your workspace: `databricks bundle deploy -t dev`.
4. Open the created app named "Sentinel Safety Dashboard" from the Apps UI.

### Notes on `databricks.yml`
- The bundle root path is set under `/Workspace/Users/${workspace.current_user.userName}/apps/...`; adjust if you use a shared workspace folder.
- Permissions default to `CAN_MANAGE` for the current user; tighten to `CAN_VIEW` or share with groups as needed.
- `entry_point` is `app.py`; add extra files to `source_path` if you split code later.

## Next steps (optional)
- Replace static data in `app.py` with Unity Catalog queries, Lakehouse tables, or REST API calls.
- Add telemetry refresh with `st.cache_data` and configurable polling intervals.
- Parameterize thresholds (malice/toxicity/grounding) via `st.slider` controls.
- Attach alerting by publishing metrics to a Delta table or SQL alert.
