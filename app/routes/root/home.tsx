import React from "react";

import {

  ArrowRight,

  BarChart3,

  Check,

  CheckCircle2,

  ChevronRight,

  CircleCheck,

  ClipboardList,

  LayoutDashboard,

  MessageSquare,

  Search,

  Settings,

  Users,

  Zap,

} from "lucide-react";

import { Link } from "react-router";



export function meta() {

  return [

    { title: "Flowdesk — Turn work into flow." },

    {

      name: "description",

      content:

        "Flowdesk brings projects, tasks, teams, and progress into one central workspace.",

    },

  ];

}



const HomePage = () => {

  return (

    <div className="min-h-screen overflow-hidden bg-white text-slate-950">

      {/* ================= NAVBAR ================= */}



      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-3 sm:px-6">

        <div className="mx-auto flex h-14 max-w-[820px] items-center justify-between rounded-2xl border border-white/80 bg-white/65 px-5 shadow-[0_8px_40px_rgba(30,64,175,0.08)] backdrop-blur-[24px] supports-[backdrop-filter]:bg-white/55 sm:px-6">

          {/* Logo */}

          <Link to="/" className="flex items-center gap-2.5">

{/*             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-md shadow-blue-600/20">

              <Check className="h-4.5 w-4.5 text-white" />

            </div> */}

<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-md shadow-blue-600/20">
  <div className="relative h-4 w-4">
    <span className="absolute left-0 top-0 h-2.5 w-2.5 rounded-[3px] border-2 border-white" />
    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-[3px] border-2 border-white" />
    <span className="absolute left-[5px] top-[5px] h-1.5 w-1.5 rounded-full bg-white" />
  </div>
</div>



            <span className="text-lg font-bold tracking-tight text-slate-900">

              Flow<span className="text-blue-600">desk</span>

            </span>

          </Link>



          {/* Navigation */}

          <nav className="hidden items-center gap-7 md:flex">

            <a

              href="#product"

              className="text-[12px] font-semibold text-slate-600 transition hover:text-slate-950"

            >

              Product

            </a>



            <a

              href="#features"

              className="text-[12px] font-semibold text-slate-600 transition hover:text-slate-950"

            >

              Features

            </a>



            <a

              href="#how-it-works"

              className="text-[12px] font-semibold text-slate-600 transition hover:text-slate-950"

            >

              How it works

            </a>



            <a

              href="#about"

              className="text-[12px] font-semibold text-slate-600 transition hover:text-slate-950"

            >

              About

            </a>

          </nav>



          {/* Actions */}

          <div className="flex items-center gap-3">

            <Link

              to="/sign-in"

              className="hidden text-[12px] font-semibold text-slate-700 transition hover:text-blue-600 sm:block"

            >

              Log in

            </Link>



            <Link

              to="/sign-up"

              className="group inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-[12px] font-semibold text-white shadow-md shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700"

            >

              Get Started

              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />

            </Link>

          </div>

        </div>

      </header>



      <main>

        {/* ================= HERO ================= */}



        <section className="relative overflow-hidden pt-[82px]">

          {/* Background glow */}

          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

            <div className="absolute left-[-180px] top-[180px] h-[420px] w-[420px] rounded-full bg-blue-100/70 blur-3xl" />



            <div className="absolute right-[-120px] top-[100px] h-[520px] w-[520px] rounded-full bg-blue-100/80 blur-3xl" />



            <div className="absolute left-[48%] top-[50px] h-[500px] w-[650px] rounded-full bg-blue-50/80 blur-3xl" />



            <div className="absolute bottom-[-180px] left-[35%] h-[350px] w-[700px] rounded-full bg-blue-100/40 blur-3xl" />

          </div>



          <div className="mx-auto max-w-[1180px] px-6 pb-8 pt-8 sm:px-8 lg:pb-10 lg:pt-10">

            <div className="grid items-center gap-6 lg:grid-cols-[390px_1fr] lg:gap-5">

              {/* ================= HERO LEFT ================= */}



              <div className="relative z-20">

                {/* Badge */}

                <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-600 shadow-sm backdrop-blur-md">

                  <Zap className="h-3.5 w-3.5" />

                  Turn work into flow.

                </div>



                {/* Heading */}

                <h1 className="animate-fade-up-delay mt-5 text-[50px] font-bold leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-[56px] lg:text-[60px]">

                  Manage work.

                  <br />



                  <span className="text-blue-600">Move faster.</span>

                </h1>



                {/* Description */}

                <p className="animate-fade-up-delay-2 mt-5 max-w-[380px] text-[14px] leading-6 text-slate-600">

                  Flowdesk gives your team one place to organize projects,

                  manage tasks, track progress, and collaborate without the

                  chaos.

                </p>



                {/* Buttons */}

                <div className="animate-fade-up-delay-3 mt-5 flex flex-wrap gap-2.5">

                  <Link

                    to="/sign-up"

                    className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700"

                  >

                    Get Started — It's Free

                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />

                  </Link>



                  <a

                    href="#product"

                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/80 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"

                  >

                    Explore Flowdesk

                    <ChevronRight className="h-3.5 w-3.5" />

                  </a>

                </div>



                {/* Benefits */}

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-500">

                  <span className="flex items-center gap-1.5">

                    <CircleCheck className="h-3.5 w-3.5 text-green-500" />

                    Easy to use

                  </span>



                  <span className="flex items-center gap-1.5">

                    <CircleCheck className="h-3.5 w-3.5 text-green-500" />

                    Team collaboration

                  </span>



                  <span className="flex items-center gap-1.5">

                    <CircleCheck className="h-3.5 w-3.5 text-green-500" />

                    Built for productivity

                  </span>

                </div>

              </div>



              {/* ================= DASHBOARD ================= */}



              <div

                id="product"

                className="animate-dashboard relative scroll-mt-24"

              >

                {/* Blue background shapes */}

                <div className="absolute left-[8%] top-[15%] -z-10 h-[260px] w-[260px] rounded-full bg-blue-200/70 blur-2xl" />



                <div className="absolute right-[2%] top-[8%] -z-10 h-[240px] w-[240px] rounded-full bg-blue-300/40 blur-2xl" />



                <div className="absolute bottom-[-25px] left-[15%] -z-10 h-[160px] w-[500px] rounded-full bg-blue-100/80 blur-2xl" />



                {/* Orbit */}

                <div className="pointer-events-none absolute left-[28%] top-[-25px] z-0 h-[110px] w-[370px] rounded-full border border-blue-400/40 rotate-[-10deg]" />



                <div className="pointer-events-none absolute left-[46%] top-[-32px] z-10 h-2.5 w-2.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />



                {/* Floating circle */}

                <div className="animate-float absolute right-[-5px] top-[30px] z-30 h-11 w-11 rounded-full bg-blue-600 shadow-xl shadow-blue-600/30" />



                {/* Dashboard */}

                <div className="relative z-20 mx-auto w-full max-w-[700px] transform-gpu rotate-[-1deg] overflow-hidden rounded-[20px] border border-white/90 bg-white/90 shadow-[0_30px_70px_rgba(37,99,235,0.20)] backdrop-blur-xl">

                  {/* Browser */}

                  <div className="flex h-8 items-center gap-1.5 border-b border-slate-200/80 bg-white/80 px-3">

                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />

                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />

                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />



                    <div className="ml-3 flex h-5.5 flex-1 items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 text-[7px] text-slate-400">

                      flowdesk.app/dashboard

                    </div>

                  </div>



                  <div className="grid grid-cols-[105px_1fr]">

                    {/* Sidebar */}

                    <div className="border-r border-slate-200 bg-white p-3">

                      <div className="mb-5 flex items-center gap-1.5">

                        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600">

                          <Check className="h-3 w-3 text-white" />

                        </div>



                        <span className="text-[9px] font-bold text-slate-900">

                          Flowdesk

                        </span>

                      </div>



                      <div className="space-y-1">

                        <PreviewNav

                          icon={<LayoutDashboard />}

                          label="Dashboard"

                          active

                        />



                        <PreviewNav

                          icon={<ClipboardList />}

                          label="Projects"

                        />



                        <PreviewNav

                          icon={<CheckCircle2 />}

                          label="My Tasks"

                        />



                        <PreviewNav

                          icon={<BarChart3 />}

                          label="Analytics"

                        />



                        <PreviewNav icon={<Users />} label="Team" />



                        <PreviewNav

                          icon={<Settings />}

                          label="Settings"

                        />

                      </div>



                      <div className="mt-8 rounded-lg bg-slate-50 p-2">

                        <p className="text-[7px] font-semibold text-slate-700">

                          Product Team

                        </p>



                        <p className="mt-0.5 text-[6px] text-slate-400">

                          4 members

                        </p>

                      </div>

                    </div>



                    {/* Main */}

                    <div className="bg-slate-50/70 p-3 sm:p-4">

                      {/* Header */}

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-[7px] text-slate-400">

                            Good morning 👋

                          </p>



                          <h3 className="mt-0.5 text-[13px] font-bold text-slate-900">

                            Here's what's happening in your workspace.

                          </h3>

                        </div>



                        <div className="flex items-center gap-1.5">

                          <div className="hidden h-6 w-24 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-[6px] text-slate-400 sm:flex">

                            <Search className="h-2.5 w-2.5" />

                            Search tasks...

                          </div>



                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[6px] font-bold text-blue-600">

                            JD

                          </div>

                        </div>

                      </div>



                      {/* Workspace status */}

                      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">

                        <span className="rounded-full bg-blue-50 px-2 py-1 text-[6px] font-semibold text-blue-600">

                          Product Team

                        </span>



                        <span className="rounded-full bg-green-50 px-2 py-1 text-[6px] font-semibold text-green-600">

                          On track

                        </span>



                        <span className="text-[6px] text-slate-400">

                          Updated just now

                        </span>

                      </div>



                      {/* Mini Stats */}

                      <div className="mt-2 grid grid-cols-4 gap-1.5">

                        <MiniDashboardCard

                          icon={<ClipboardList />}

                          title="Projects"

                          value="12"

                        />



                        <MiniDashboardCard

                          icon={<CheckCircle2 />}

                          title="Tasks"

                          value="28"

                        />



                        <MiniDashboardCard

                          icon={<Zap />}

                          title="In Progress"

                          value="6"

                        />



                        <MiniDashboardCard

                          icon={<BarChart3 />}

                          title="Completed"

                          value="18"

                        />

                      </div>



                      {/* Main Cards */}

                      <div className="mt-2 grid grid-cols-5 gap-1.5">

                        {/* Recent Tasks */}

                        <div className="col-span-3 rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">

                          <div className="flex items-center justify-between">

                            <div>

                              <p className="text-[8px] font-bold text-slate-900">

                                Recent Tasks

                              </p>



                              <p className="mt-0.5 text-[6px] text-slate-400">

                                Your latest work

                              </p>

                            </div>



                            <span className="text-[6px] font-semibold text-blue-600">

                              View all

                            </span>

                          </div>



                          <div className="mt-2.5 space-y-2">

                            <PreviewTask

                              title="Design dashboard interface"

                              status="High"

                              statusClass="bg-red-50 text-red-500"

                              date="Sep 21"

                              checked={false}

                            />



                            <PreviewTask

                              title="Implement authentication"

                              status="In Progress"

                              statusClass="bg-blue-50 text-blue-600"

                              date="Sep 22"

                              checked={false}

                            />



                            <PreviewTask

                              title="Create project management API"

                              status="Todo"

                              statusClass="bg-slate-100 text-slate-500"

                              date="Sep 25"

                              checked={false}

                            />



                            <PreviewTask

                              title="Write documentation"

                              status="Completed"

                              statusClass="bg-green-50 text-green-600"

                              date="Done"

                              checked

                            />

                          </div>

                        </div>



                        {/* Projects */}

                        <div className="col-span-2 rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">

                          <div className="flex items-center justify-between">

                            <div>

                              <p className="text-[8px] font-bold text-slate-900">

                                Project Progress

                              </p>



                              <p className="mt-0.5 text-[6px] text-slate-400">

                                Current projects

                              </p>

                            </div>



                            <span className="text-[6px] font-semibold text-blue-600">

                              View all

                            </span>

                          </div>



                          <div className="mt-3 space-y-3">

                            <ProjectProgress

                              name="Website Redesign"

                              tasks="12 tasks"

                              progress="60%"

                              width="60%"

                            />



                            <ProjectProgress

                              name="Mobile App"

                              tasks="8 tasks"

                              progress="35%"

                              width="35%"

                            />



                            <ProjectProgress

                              name="Marketing Campaign"

                              tasks="6 tasks"

                              progress="80%"

                              width="80%"

                            />

                          </div>

                        </div>

                      </div>



                      {/* Bottom Cards */}

                      <div className="mt-1.5 grid grid-cols-2 gap-1.5">

                        {/* Team Activity */}

                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">

                          <div className="flex items-center justify-between">

                            <p className="text-[8px] font-bold text-slate-900">

                              Team Activity

                            </p>



                            <Users className="h-2.5 w-2.5 text-slate-400" />

                          </div>



                          <div className="mt-2 space-y-2">

                            <ActivityRow

                              name="Alex"

                              text="added a new task"

                            />



                            <ActivityRow

                              name="Priya"

                              text="completed a task"

                            />



                            <ActivityRow

                              name="You"

                              text="updated the API task"

                            />

                          </div>

                        </div>



                        {/* Task Overview */}

                        <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">

                          <p className="text-[8px] font-bold text-slate-900">

                            Tasks Overview

                          </p>



                          <div className="mt-2 flex h-[58px] items-end gap-1.5">

                            {[30, 45, 62, 48, 76, 58, 92].map(

                              (height, index) => (

                                <div

                                  key={index}

                                  className="flex flex-1 flex-col items-center gap-1"

                                >

                                  <div

                                    className={`w-full rounded-t-sm ${

                                      index === 6

                                        ? "bg-blue-600"

                                        : "bg-blue-200"

                                    }`}

                                    style={{

                                      height: `${height}%`,

                                    }}

                                  />



                                  <span className="text-[5px] text-slate-400">

                                    {

                                      [

                                        "M",

                                        "T",

                                        "W",

                                        "T",

                                        "F",

                                        "S",

                                        "S",

                                      ][index]

                                    }

                                  </span>

                                </div>

                              ),

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>



            {/* ================= FEATURES INTRO ================= */}



            <div

              id="features"

              className="mx-auto mt-8 max-w-3xl scroll-mt-24 text-center"

            >

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-blue-600">

                Powerful features

              </p>



              <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">

                Everything your team needs to move work forward

              </h2>



              <p className="mx-auto mt-2 max-w-xl text-[10px] leading-5 text-slate-500">

                From planning projects to completing the final task, Flowdesk

                keeps your workflow organized and connected.

              </p>

            </div>

          </div>

        </section>



        {/* ================= FEATURES ================= */}



        <section className="border-y border-slate-100 bg-slate-50/60" style={{ contentVisibility: "auto", containIntrinsicSize: "650px" }}>

          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <FeatureCard

                icon={<LayoutDashboard />}

                title="Powerful Dashboard"

                description="Get a clear overview of projects, tasks, progress, and productivity."

              />



              <FeatureCard

                icon={<ClipboardList />}

                title="Task Management"

                description="Create, assign, prioritize, update, and complete tasks from one place."

              />



              <FeatureCard

                icon={<Users />}

                title="Team Collaboration"

                description="Work together through workspaces, members, assignments, and invitations."

              />



              <FeatureCard

                icon={<BarChart3 />}

                title="Track Progress"

                description="Understand your team's progress with useful statistics and visual insights."

              />

            </div>

          </div>

        </section>



        {/* ================= HOW IT WORKS ================= */}



        <section id="how-it-works" className="scroll-mt-20" style={{ contentVisibility: "auto", containIntrinsicSize: "550px" }}>

          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">

            <div className="mx-auto max-w-2xl text-center">

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">

                How it works

              </p>



              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">

                From idea to done.

              </h2>



              <p className="mt-4 text-lg text-slate-600">

                A simple workflow designed to keep your team focused.

              </p>

            </div>



            <div className="mt-14 grid gap-10 md:grid-cols-4">

              <Step

                number="01"

                title="Create a workspace"

                description="Bring your team together in one organized workspace."

              />



              <Step

                number="02"

                title="Create projects"

                description="Break your work into projects with clear goals and tasks."

              />



              <Step

                number="03"

                title="Assign tasks"

                description="Set priorities, deadlines, and owners for every task."

              />



              <Step

                number="04"

                title="Track & complete"

                description="Monitor progress and keep moving until the work is done."

              />

            </div>

          </div>

        </section>



        {/* ================= ABOUT ================= */}



        <section

          id="about"

          className="scroll-mt-20 bg-slate-950 text-white"

        >

          <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-28">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-400">

                About Flowdesk

              </p>



              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">

                Less chaos.

                <br />

                <span className="text-blue-500">More progress.</span>

              </h2>



              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">

                Flowdesk brings projects, tasks, teams, and progress into one

                central workspace — so your team can stay organized,

                collaborate better, and keep work moving.

              </p>



              <div className="mt-8 space-y-4">

                {[

                  "Organize projects and workspaces",

                  "Assign and manage team tasks",

                  "Track priorities and progress",

                  "Keep your team's work in one place",

                ].map((item) => (

                  <div

                    key={item}

                    className="flex items-center gap-3 text-sm text-slate-300"

                  >

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600/20">

                      <Check className="h-4 w-4 text-blue-400" />

                    </div>



                    {item}

                  </div>

                ))}

              </div>

            </div>



            <div className="relative">

              <div className="absolute -inset-6 rounded-[3rem] bg-blue-600/10 blur-3xl" />



              <div className="relative rounded-[28px] border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">

                <div className="grid grid-cols-2 gap-4">

                  <MiniStat

                    icon={<ClipboardList />}

                    value="Tasks"

                    label="Organized in one place"

                  />



                  <MiniStat

                    icon={<Users />}

                    value="Teams"

                    label="Collaborate together"

                  />



                  <MiniStat

                    icon={<BarChart3 />}

                    value="Progress"

                    label="Track your work"

                  />



                  <MiniStat

                    icon={<CheckCircle2 />}

                    value="Projects"

                    label="Keep everything organized"

                  />

                </div>



                <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20">

                      <MessageSquare className="h-5 w-5 text-blue-400" />

                    </div>



                    <div>

                      <p className="text-sm font-semibold text-white">

                        Team collaboration

                      </p>



                      <p className="mt-1 text-xs text-slate-500">

                        Keep everyone aligned and moving forward.

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/* ================= CTA ================= */}



        <section>

          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">

            <div className="relative overflow-hidden rounded-[28px] bg-blue-600 px-6 py-16 text-center shadow-2xl shadow-blue-600/20 sm:px-12">

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />



              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />



              <div className="relative">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">

                  Flowdesk

                </p>



                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">

                  Ready to get work flowing?

                </h2>



                <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-blue-100">

                  Create your workspace and start managing projects, tasks,

                  and teams from one place.

                </p>



                <Link

                  to="/sign-up"

                  className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-blue-600 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-50"

                >

                  Get Started Free

                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />

                </Link>

              </div>

            </div>

          </div>

        </section>

      </main>



      {/* ================= FOOTER ================= */}



      <footer className="border-t border-slate-200 bg-white" style={{ contentVisibility: "auto", containIntrinsicSize: "120px" }}>

        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">

          <Link to="/" className="flex items-center gap-2">

{/*             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">

              <Check className="h-4 w-4 text-white" />

            </div> */}

<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
  <div className="relative h-4 w-4">
    <span className="absolute left-0 top-0 h-2.5 w-2.5 rounded-[3px] border-2 border-white" />
    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-[3px] border-2 border-white" />
    <span className="absolute left-[5px] top-[5px] h-1.5 w-1.5 rounded-full bg-white" />
  </div>
</div>



            <span className="font-bold">

              Flow<span className="text-blue-600">desk</span>

            </span>

          </Link>



          <div className="flex flex-wrap gap-5 text-sm text-slate-500">

            <a href="#product" className="hover:text-blue-600">

              Product

            </a>



            <a href="#features" className="hover:text-blue-600">

              Features

            </a>



            <a href="#how-it-works" className="hover:text-blue-600">

              How it works

            </a>



            <a href="#about" className="hover:text-blue-600">

              About

            </a>



            <Link to="/sign-in" className="hover:text-blue-600">

              Log in

            </Link>

          </div>



          <p className="text-sm text-slate-400">

            © 2026 Flowdesk. All rights reserved.

          </p>

        </div>

      </footer>



      {/* ================= ANIMATIONS ================= */}



      <style>{`

        @keyframes fadeUp {

          from {

            opacity: 0;

            transform: translateY(18px);

          }



          to {

            opacity: 1;

            transform: translateY(0);

          }

        }



        @keyframes dashboardIn {

          from {

            opacity: 0;

            transform: translateY(25px) rotateX(3deg) rotateZ(-1deg);

          }



          to {

            opacity: 1;

            transform: translateY(0) rotateX(0) rotateZ(-1deg);

          }

        }



        @keyframes float {

          0%, 100% {

            transform: translateY(0);

          }



          50% {

            transform: translateY(-10px);

          }

        }



        .animate-fade-up {

          animation: fadeUp 0.7s ease-out both;

        }



        .animate-fade-up-delay {

          animation: fadeUp 0.7s ease-out 0.08s both;

        }



        .animate-fade-up-delay-2 {

          animation: fadeUp 0.7s ease-out 0.16s both;

        }



        .animate-fade-up-delay-3 {

          animation: fadeUp 0.7s ease-out 0.24s both;

        }



        .animate-dashboard {

          animation: dashboardIn 0.9s ease-out 0.12s both;

        }



        .animate-float {

          animation: float 4s ease-in-out infinite;

        }



        @media (prefers-reduced-motion: reduce) {

          .animate-fade-up,

          .animate-fade-up-delay,

          .animate-fade-up-delay-2,

          .animate-fade-up-delay-3,

          .animate-dashboard,

          .animate-float {

            animation: none;

          }

        }

      `}</style>

    </div>

  );

};



/\* ================= MINI DASHBOARD CARD ================= */



const MiniDashboardCard = ({

  icon,

  title,

  value,

}: {

  icon: React.ReactNode;

  title: string;

  value: string;

}) => {

  return (

    <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">

      <div className="flex items-center gap-1.5">

        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-50 text-blue-600">

          <span className="[&>svg]:h-2.5 [&>svg]:w-2.5">

            {icon}

          </span>

        </div>



        <div>

          <p className="text-[8px] font-bold text-slate-900">

            {value}

          </p>



          <p className="text-[5px] text-slate-400">

            {title}

          </p>

        </div>

      </div>

    </div>

  );

};



/\* ================= PREVIEW NAV ================= */



const PreviewNav = ({

  icon,

  label,

  active = false,

}: {

  icon: React.ReactNode;

  label: string;

  active?: boolean;

}) => {

  return (

    <div

      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[8px] font-medium transition ${

        active

          ? "bg-blue-50 text-blue-600"

          : "text-slate-500 hover:bg-slate-50"

      }`}

    >

      <span className="[&>svg]:h-3 [&>svg]:w-3">

        {icon}

      </span>



      {label}

    </div>

  );

};



/\* ================= PREVIEW TASK ================= */



const PreviewTask = ({

  title,

  status,

  statusClass,

  date,

  checked,

}: {

  title: string;

  status: string;

  statusClass: string;

  date: string;

  checked: boolean;

}) => {

  return (

    <div className="flex items-center gap-2">

      <div

        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border ${

          checked

            ? "border-blue-600 bg-blue-600"

            : "border-slate-300 bg-white"

        }`}

      >

        {checked && <Check className="h-2 w-2 text-white" />}

      </div>



      <p

        className={`min-w-0 flex-1 truncate text-[7px] font-medium ${

          checked

            ? "text-slate-400 line-through"

            : "text-slate-700"

        }`}

      >

        {title}

      </p>



      <span

        className={`hidden rounded-md px-1.5 py-1 text-[5px] font-semibold sm:block ${statusClass}`}

      >

        {status}

      </span>



      <span className="text-[5px] text-slate-400">

        {date}

      </span>

    </div>

  );

};



/\* ================= PROJECT PROGRESS ================= */



const ProjectProgress = ({

  name,

  tasks,

  progress,

  width,

}: {

  name: string;

  tasks: string;

  progress: string;

  width: string;

}) => {

  return (

    <div>

      <div className="flex items-center justify-between">

        <div>

          <p className="text-[7px] font-semibold text-slate-700">

            {name}

          </p>



          <p className="mt-0.5 text-[5px] text-slate-400">

            {tasks}

          </p>

        </div>



        <span className="text-[6px] font-semibold text-slate-500">

          {progress}

        </span>

      </div>



      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">

        <div

          className="h-full rounded-full bg-blue-600"

          style={{ width }}

        />

      </div>

    </div>

  );

};



/\* ================= ACTIVITY ================= */



const ActivityRow = ({

  name,

  text,

}: {

  name: string;

  text: string;

}) => {

  return (

    <div className="flex items-center gap-2">

      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[6px] font-bold text-blue-600">

        {name.charAt(0)}

      </div>



      <div>

        <p className="text-[6px] text-slate-600">

          <span className="font-semibold">{name}</span> {text}

        </p>



        <p className="mt-0.5 text-[5px] text-slate-400">

          2 hours ago

        </p>

      </div>

    </div>

  );

};



/\* ================= FEATURE CARD ================= */



const FeatureCard = ({

  icon,

  title,

  description,

}: {

  icon: React.ReactNode;

  title: string;

  description: string;

}) => {

  return (

    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/50">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">

        <span className="[&>svg]:h-5 [&>svg]:w-5">

          {icon}

        </span>

      </div>



      <h3 className="mt-5 text-lg font-semibold">

        {title}

      </h3>



      <p className="mt-2 text-sm leading-6 text-slate-600">

        {description}

      </p>



      <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-600">

        Explore

        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />

      </div>

    </div>

  );

};



/\* ================= STEP ================= */



const Step = ({

  number,

  title,

  description,

}: {

  number: string;

  title: string;

  description: string;

}) => {

  return (

    <div className="group">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 group-hover:-translate-y-1">

        {number}

      </div>



      <h3 className="mt-5 text-lg font-semibold">

        {title}

      </h3>



      <p className="mt-2 text-sm leading-6 text-slate-600">

        {description}

      </p>

    </div>

  );

};



/\* ================= MINI STAT ================= */



const MiniStat = ({

  icon,

  value,

  label,

}: {

  icon: React.ReactNode;

  value: string;

  label: string;

}) => {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-500/40">

      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">

        <span className="[&>svg]:h-4 [&>svg]:w-4">

          {icon}

        </span>

      </div>



      <p className="mt-4 text-lg font-bold text-white">

        {value}

      </p>



      <p className="mt-1 text-xs text-slate-500">

        {label}

      </p>

    </div>

  );

};



export default HomePage;