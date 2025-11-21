import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aispciespxjbkhcznuot.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpc3BjaWVzcHhqYmtoY3pudW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDUyMjMsImV4cCI6MjA3NDI4MTIyM30.VMqM_L3hw1wrLHfO9pQfPajwVMhXY4dAPi9KkxiGMTs'
export const supabase = createClient(supabaseUrl, supabaseKey)