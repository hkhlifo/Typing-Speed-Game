function PageContainer({ children, className = "" }) {
    return (
        <main
            className={`min-h-screen bg-[#08061a] px-4 py-6 text-slate-100 sm:px-6 sm:py-10 ${className}`}
        >
            <div className="mx-auto w-full max-w-5xl">
                {children}
            </div>
        </main>
    );
}

export default PageContainer;