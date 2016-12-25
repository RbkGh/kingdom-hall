# 
# MEETING RECORDING SCRIPT, Joshua Curtiss 8/24/2016
#
# This script takes the meeting recordings (in the "Video" directory) and copies them
# into subdirectories (named after the date of the recording) in the "OneDrive\SLC MEETING VIDEOS"
# directory. Set this up as a scheduled task to require no further user involvement.
#

# Set up paths, make sure directories exist.
$sourcedir=$env:USERPROFILE + "\Videos"
$donedir=$sourcedir + "\Done\"
$targetbasedir=$env:USERPROFILE + "\OneDrive\SLC MEETING VIDEOS\"
if( !(Test-Path -Path $donedir) ) {New-Item -ItemType "directory" -Path $donedir | Out-Null}
if( !(Test-Path -Path $targetbasedir) ) {New-Item -ItemType "directory" -Path $targetbasedir | Out-Null}

# Process all source directory items!
Get-ChildItem $sourcedir\*.* -include *.f4v,*.mp4,*.txt | ForEach-Object {
	$created=$_.CreationTime
    $d=$created.toString("yyyy-MM-dd")
    $targetdir=$targetbasedir + $d + "\"
    $archivedir=$donedir + $d
    $fullsourcepath=$_.FullName
    $fulltargetpath=$targetdir + $_.BaseName + ".mp4"
    if( !(Test-Path -Path $targetdir) ) {New-Item -ItemType "directory" -Path $targetdir | Out-Null}
    if( !(Test-Path -Path $archivedir) ) {New-Item -ItemType "directory" -Path $archivedir | Out-Null}
    Write-Output($fullsourcepath + " -> " + $fulltargetpath)
    # Convert the file:
    ffmpeg -i $fullsourcepath $fulltargetpath
    # Send original to archive folder, the converted file to target location in OneDrive:
    Move-Item -Path $fullsourcepath -Destination $archivedir
    Move-Item -Path $fulltargetpath -Destination $targetdir
}