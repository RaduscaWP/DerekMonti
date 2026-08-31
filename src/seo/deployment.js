const TRUE_VALUES = new Set(['1', 'true', 'yes']);

export function shouldNoindexDeployment(environment = process.env) {
  const explicitFlag = String(environment.FLY_WITH_DEREK_NOINDEX || '').trim().toLowerCase();
  if (TRUE_VALUES.has(explicitFlag)) return true;

  const vercelEnvironment = String(environment.VERCEL_ENV || '').trim().toLowerCase();
  return Boolean(vercelEnvironment && vercelEnvironment !== 'production');
}

