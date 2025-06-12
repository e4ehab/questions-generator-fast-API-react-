import "react"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"
//userbutton -> press to see my profile
import { Outlet, Navigate, Link } from "react-router-dom"

export function Layout() {
    return (
        <div className="app-layout">
            <header className="app-header">
                <div className="header-content">
                    <h1>Code Challenge Generator</h1>
                    <nav>
                        <SignedIn> {/* show the following if we are only signed-in */}
                            <Link to="/">Generate Challenge</Link>
                            <Link to="/history">History</Link>
                            <UserButton />
                        </SignedIn>

                    </nav>
                </div>
            </header>

            <main className="app-main">
                <SignedOut>
                    <Navigate to="/sign-in" replace />
                </SignedOut>
                <SignedIn>
                    <Outlet />
                </SignedIn>
            </main>


        </div>
    );
}
