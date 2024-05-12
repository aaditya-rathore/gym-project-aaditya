import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zbmroyocrfoxcwfzeebn.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpibXJveW9jcmZveGN3ZnplZWJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzMTE2NjYsImV4cCI6MjAyOTg4NzY2Nn0.xKvVl-F7nGu6fzTqu3hyKkFCZ0557dqV7dfeLDQSfzo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
