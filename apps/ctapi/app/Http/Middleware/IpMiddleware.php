<?php
namespace App\Http\Middleware;
   
use Closure;
   
class IpMiddleware
{
    
    public $restrictIps = ['87.123.202.176','127.0.0.1'];
        
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!in_array($request->ip(), $this->restrictIps)) {
    
            return response()->json(['you don\'t have permission to access this application.']);
        }
    
        return $next($request);
    }
}