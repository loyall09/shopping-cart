function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        {/* Animated loader */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-4 left-4 w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
        
        {/* Loading text with animation */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 animate-pulse">
            Loading
          </h2>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-gray-600 mt-4">Please wait while we fetch your content</p>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;